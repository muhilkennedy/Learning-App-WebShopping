import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from "@angular/core";
import { BarecodeScannerLivestreamComponent } from "ngx-barcode-scanner";
// import { PosProduct } from '../../shared/pos/posProduct';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { ProductService } from '../../shared/product/product.service';
import { SafePropertyRead } from '@angular/compiler';
import { AlertService } from '../../shared/_alert';
import { PosService } from '../../shared/pos/pos.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeService } from '../../shared/employee/employee.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

class PosProduct{
  itemID: number;
  itemName: string;
  itemCode: string;
  mrp: number;
  quantity: number;
  discount: number;
  total: number;
  sellingCost: number;
}

@Component({
  templateUrl: 'pos.component.html',
  styleUrls: ['pos.component.scss']
})
export class PosComponent implements OnInit {

  loading = false;
  itemList: PosProduct[] = new Array();
  prod: PosProduct = new PosProduct();
  customerMobile: number;
  customerName: string;
  customerEmail: string;
  customerLoyality: string;

  totalDiscount: number = 0;
  disablePayment: boolean = true;
  subTotal: number = 0;
  totalQuantity: number = 0;
  newCustomer = false;

  amountPaid: number;
  balanceAmount: number;

  posId:string;

  focusElementReference: any

  paymentTypes: string[] = ['cash', 'card', 'gpay', 'phone pe', 'paytm', 'others'];
  paymentMode: string = this.paymentTypes[0];

  alertoptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  //Insert new entry incase of shift and enter key press
  @HostListener('keyup', ['$event']) onKeyDown(e) {
    if (e.keyCode == 13 && e.shiftKey ) {
      this.addItem();
    }
  }

  //clear all entries shift+delete
  @HostListener('keydown', ['$event']) onKeyUp(e) {
    if (e.keyCode == 46 && e.shiftKey ) {
      this.clearData();
    }
  }

  addItem(){
    let newProd:PosProduct = new PosProduct();
    newProd.mrp = 0;
    newProd.discount = 0;
    newProd.quantity = 0;
    this.itemList.push(newProd);
  }

  constructor(private printService: PrintService, private productService: ProductService,
              private alertService: AlertService, private posService: PosService,
              private empService: EmployeeService, private sanitizer: DomSanitizer){
    this.usbPrintDriver = new UsbDriver();
        this.printService.isConnected.subscribe(result => {
            this.status = result;
            if (result) {
                console.log('Connected to printer!!!');
            } else {
            console.log('Not connected to printer.');
            }
        });
  }

  ngOnInit(): void {
    let newProd:PosProduct = new PosProduct();
    this.itemList.push(newProd);
    let notificationInterval = setInterval(() => { this.changeFocus() }, 500);
  }

  ngAfterViewInit(){
    console.log("after view")
  }

  //PRINTER RELATED
  status: boolean = false;
  usbPrintDriver: UsbDriver;
  webPrintDriver: WebPrintDriver;
  ip: string = '';
  requestUsb() {
      this.usbPrintDriver.requestUsb().subscribe(result => {
          this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
      });
  }
  connectToWebPrint() {
      this.webPrintDriver = new WebPrintDriver(this.ip);
      this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
  }
  print(driver: PrintDriver) {
      this.printService.init()
          .setBold(true)
          .writeLine('Hello World!')
          .setBold(false)
          .feed(4)
          .cut('full')
          .flush();
  }

  //CAMERA BARCODE SCANNER
  /*@ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;
  barcodeValue: string = '';
  ngAfterViewInit() {
    this.barecodeScanner.start();
  }
  onValueChanges(result) {
    if(this.barcodeValue != result.codeResult.code){
      this.barcodeValue = result.codeResult.code;
      this.getProductFromCode(result.codeResult.code);
    }
  }
  onStarted(started) {
    console.log("Camera Active = ",started);
  }*/

  //BARCODE SCANNER
  itemBarCode = '';
  codeDetected(){
    let item;
    if(this.itemList !== undefined && this.itemList.length > 0){
      item = this.itemList.filter(item => (item.itemCode !== undefined && item.itemCode === this.itemBarCode));
    }
    if(item !== undefined && item.length > 0){
      this.incrementQuantity();

    }
    else{
      this.getProductFromCode(this.itemBarCode);
    }
  }

  changeFocus(){
    let focusElementReferenceLocal = document.getElementById('pbcode-'+(this.itemList.length-1));
    if ((this.focusElementReference === undefined || this.focusElementReference instanceof HTMLElement)
          && this.focusElementReference != focusElementReferenceLocal ) {
          this.focusElementReference = focusElementReferenceLocal;
          this.focusElementReference.focus();
    }
  }

  //PRODUCT APP LOGIC
  //autoComplete
  myControl = new FormControl('', [
    Validators.required
  ]);
  options: any[] = new Array();
  filteredOptions: Observable<any[]>;

  previousSearchTerm = '';
  getProducts(event: any){
    let searchTerm = '';
    searchTerm += event.target.value;
    console.log(searchTerm);
    this.getProductFromMatchingText(searchTerm);
  }

  incrementQuantity(){
    this.itemList.forEach(item => {
      if(item.itemCode ===  this.itemBarCode){
        ++item.quantity;
        this.itemBarCode = '';
      }
    });
  }

  getCustomerDetails(event){
    let mobile = this.customerMobile.toString();
    if(mobile.length === 10 && ( this.customerEmail === undefined || this.customerEmail === null)){
      this.loading = true;
      this.empService.getCustomerByMobile(mobile)
                      .subscribe((resp:any) => {
                        if(resp.statusCode  === 200 && resp.data !== null){
                          this.customerEmail = resp.data.emailId;
                          this.customerName = resp.data.firstName;
                          this.customerLoyality = resp.data.loyalitypoint;
                          this.newCustomer = false;
                        }
                        else{
                          this.newCustomer = true;
                        }
                        this.loading = false;
                      },
                      (error:any) => {
                        this.alertService.error("something went wrong!");
                        this.loading = false;
                      });
    }
  }

  getProductFromMatchingText(searchTerm){
    // && this.previousSearchTerm !== searchTerm
    if (searchTerm.length > 3 && searchTerm.length < 5) {
      this.productService.getProductByMatchingNameOrCode(searchTerm)
                          .subscribe((resp:any) => {
                            if(resp.statusCode  === 200){
                              this.options = resp.dataList;
                              this.filteredOptions = this.myControl.valueChanges.pipe(
                                startWith(''),
                                map(value => this._filter(value))
                              );
                            }
                            else{
                              this.alertService.error('Failed : ' + resp.errorMessages);
                            }
                            this.previousSearchTerm = searchTerm;
                            this.loading = false;
                          },
                          (error:any) => {
                            this.alertService.error("something went wrong!");
                            this.loading = false;
                          });
    }
  }

  private _filter(value: string): string[] {
    if(value === undefined || value === "")
    {
      return;
    }
    const filterValue = value.toLowerCase();
    return this.options.filter(option => (option.productName.toLowerCase().indexOf(filterValue) === 0 ||
                                          option.productCode.toLowerCase().indexOf(filterValue) === 0));
  }
  convertToProductItem(option:any){
    let prod = new PosProduct();
    prod.itemName = option.productName;
    prod.itemCode = option.productCode;
    prod.itemID = option.productId;
    prod.discount = option.offer;
    prod.mrp = option.cost;
    prod.quantity = 1;
    prod.sellingCost = option.sellingCost;
    this.itemList.push(prod);
    this.cleanseItemList();
  }

  cleanseItemList(){
    this.itemList = this.itemList.filter(item => !(item.itemName === undefined || item.itemCode === undefined));
  }

  getProductFromCode(code){
    this.loading = true;
    this.productService.getProductByCode(code)
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            let newProd:PosProduct;
                            let doPush = false;
                            if(this.isLastItemEmpty()){
                              newProd = this.itemList[this.itemList.length - 1];
                            }
                            else{
                              newProd = new PosProduct();
                              doPush = true;
                            }
                            newProd.itemID = resp.data.productId;
                            newProd.itemName = resp.data.productName;
                            newProd.mrp = resp.data.cost;
                            newProd.discount = resp.data.offer;
                            newProd.itemCode = resp.data.productCode;
                            newProd.quantity = 1;
                            newProd.sellingCost = resp.data.sellingCost;
                            if(doPush){
                              this.itemList.push(newProd);
                            }
                            //insert dummy row
                            newProd = new PosProduct();
                            newProd.mrp = 0;
                            newProd.discount = 0;
                            newProd.quantity = 0;
                            this.itemList.push(newProd);

                            this.disablePayment = false;
                          }
                          else if (resp.statusCode === 204){
                            this.alertService.warn("Product " + this.itemBarCode + " Not Found",this.alertoptions);
                          }
                          this.loading = false;
                          this.itemBarCode = '';
                        },
                        (error) => {
                          alert(error);
                          this.loading = false;
                       });
  }

  isLastItemEmpty(){
    let prod: PosProduct = this.itemList[this.itemList.length-1];
    if(prod.itemName === '' || prod.itemName === null || prod.itemName === undefined){
      return true;
    }
    return false;
  }

  calculateTotal(item: PosProduct): number{
    if(item.discount > 0){
      item.total = (item.sellingCost * item.quantity);
    }
    else{
      item.total = item.mrp * item.quantity;
    }
    return item.total;
  }

  calcaulateSubTotal(): number{
    let total = 0;
    this.itemList.forEach(item => {
      if(item != null || item != undefined){
        total += item.total;
      }
    })
    if(total >= 0){
      this.subTotal = total;
    }
    return total;
  }

  calculateRoundedSubtotal(): number{
    return Math.round(this.subTotal);
  }

  calculateBalance(): number{
    return this.amountPaid !== undefined ? this.amountPaid - this.calculateRoundedSubtotal() : null;
  }

  calculateTotalQuantity(): number{
    let quantity = 0;
    this.itemList.forEach(item => {
      if(item != null || item != undefined){
        quantity += item.quantity;
      }
    })
    if(quantity >= 0){
      this.totalQuantity = quantity;
    }
    return quantity;
  }

  calculateTotalDiscount(): number{
    let discount = 0;
    this.itemList.forEach(item => {
      if(item != null || item != undefined){
        discount += (item.mrp - item.sellingCost) * item.quantity;
      }
    })
    if(discount >= 0){
      this.totalDiscount = discount;
    }
    return discount;
  }

  disablePaid(): boolean{
    if(this.subTotal == NaN || this.subTotal === undefined || this.subTotal <= 0){
      return true;
    }
    else{
      return false;
    }
  }

  removeItem(index:number){
    this.itemList.splice(index, 1);
  }

  clearData(){
    this.itemList.length = 0;
    this.customerEmail = null;
    this.customerLoyality = null;
    this.customerMobile = undefined;
    this.customerName = null;
    let newProd = new PosProduct();
    newProd.mrp = 0;
    newProd.discount = 0;
    newProd.quantity = 0;
    this.itemList.push(newProd);
    this.amountPaid = undefined;
    this.newCustomer = false;
    this.posId = null;
  }

  processBill(){
    this.loading = true;
    this.cleanseItemList();
    this.posService.createPOS(this.calculateTotalQuantity(), this.customerMobile, this.paymentMode, this.calculateRoundedSubtotal(), this.subTotal, this.itemList)
                    .subscribe((resp: any) => {
                      if(resp.statusCode === 200){
                        this.posId = resp.data;
                        this.myModal.show();
                      }
                      else{
                        alert("Failed");
                      }
                      this.loading = false;
                    },
                    (error) => {
                      alert("failed!");
                      this.loading = false;
                    })
  }

  @ViewChild('primaryModal') myModal;

  getPDF()
  {
    this.loading = true;
    this.posService.getPDF(this.posId)
                    .subscribe((resp: any) => {
                       this.clearData();
                        // let blob = new Blob([resp], { type: 'application/octet-stream' });
                        // let downloadURl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
                        window.open(window.URL.createObjectURL( new Blob([resp], { type: 'application/pdf' })),"_blank");
                        this.loading = false;
                        this.myModal.hide();
                    },
                    (error) => {
                      this.alertService.error("Something went wrong!", error)
                    });

  }

}
