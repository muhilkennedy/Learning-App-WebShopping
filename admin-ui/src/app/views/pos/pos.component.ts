import { Component, HostListener, OnInit } from '@angular/core';
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

class PosProduct{
  itemID: number;
  itemName: string;
  itemCode: string;
  mrp: number;
  quantity: number;
  discount: number;
  total: number;
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

  totalDiscount: number = 0;
  disablePayment: boolean = true;
  subTotal: number = 0;
  totalQuantity: number = 0;

  paymentTypes: string[] = ['cash', 'card', 'gpay', 'phone pe', 'paytm', 'others'];
  paymentMode: string = this.paymentTypes[0];

  alertoptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  //Insert new entry incase of shift and enter key press
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode == 13 && e.shiftKey ) {
      this.addItem();
    }
  }

  addItem(){
    let newProd:PosProduct = new PosProduct();
    this.itemList.push(newProd);
  }

  constructor(private printService: PrintService, private productService: ProductService,
              private alertService: AlertService, private posService: PosService){
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
  @ViewChild(BarecodeScannerLivestreamComponent)
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
  }

  //PRODUCT APP LOGIC
  //autoComplete
  myControl = new FormControl('', [
    Validators.required
  ]);
  options: any[] = new Array();
  filteredOptions: Observable<any[]>;

  getProducts(event: any){
    let searchTerm = '';
    searchTerm += event.target.value;
    console.log(searchTerm);
    if (searchTerm.length === 2 || searchTerm.length === 4) {
      this.productService.getProductByName(searchTerm)
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
    return this.options.filter(option => (option.productName.toLowerCase().indexOf(filterValue) === 0));
  }
  convertToProductItem(option:any){
    let prod = new PosProduct();
    prod.itemName = option.productName;
    prod.itemCode = option.productCode;
    prod.itemID = option.productId;
    prod.discount = option.offer;
    prod.mrp = option.cost;
    prod.quantity = 1;
    this.itemList.push(prod);
    this.cleanseItemList();
  }

  cleanseItemList(){
    this.itemList = this.itemList.filter(item => !(item.itemName === undefined || item.itemCode === undefined));
  }

  getProductFromCode(code){
    this.loading = true;
    this.productService.getPoductByCode(code)
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
                            if(doPush){
                              this.itemList.push(newProd);
                            }
                            this.disablePayment = false;
                          }
                          else if (resp.statusCode === 204){
                            this.alertService.warn("Product " + this.barcodeValue + " Not Found",this.alertoptions);
                          }
                          this.loading = false;
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
    let discountedMrp = item.mrp;
    if(item.discount > 0){
      discountedMrp = (item.mrp * item.discount) / 100;
      item.total = ((item.mrp-discountedMrp) * item.quantity);
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
        discount += (item.mrp * item.discount) / 100;
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

  processBill(){
    this.loading = true;
    this.posService.createPOS(this.customerMobile, this.paymentMode, this.calculateRoundedSubtotal(), this.itemList)
                    .subscribe((resp: any) => {
                      if(resp.statusCode === 200){
                        //proceed with bill printing
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

}
