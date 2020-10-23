import { Component, HostListener, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from "@angular/core";
import { BarecodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { PosProduct } from '../../shared/pos/posProduct';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { ProductService } from '../../shared/product/product.service';

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

  //Insert new entry incase of shift and enter key press
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode == 13 && e.shiftKey ) {
      let newProd:PosProduct = new PosProduct();
      this.itemList.push(newProd);
    }
  }

  constructor(private printService: PrintService, private productService: ProductService){
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
  getProductFromCode(code){
    this.loading = true;
    this.productService.getPoductByCode(code)
                        .subscribe((resp: any) => {
                          let newProd:PosProduct;
                          let doPush = false;
                          if(this.isLastItemEmpty()){
                            newProd = this.itemList[this.itemList.length - 1];
                          }
                          else{
                            newProd = new PosProduct();
                            doPush = true;
                          }
                          newProd.itemName = resp.data.productName;
                          newProd.mrp = resp.data.cost;
                          newProd.discount = resp.data.offer;
                          newProd.itemCode = resp.data.productCode;
                          if(doPush){
                            this.itemList.push(newProd);
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
    item.total = item.mrp * item.quantity;
    return item.total;
  }



}
