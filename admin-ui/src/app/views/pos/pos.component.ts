import { Component, HostListener, OnInit } from '@angular/core';
import { PosProduct } from '../../shared/pos/posProduct';

@Component({
  templateUrl: 'pos.component.html',
  styleUrls: ['pos.component.scss']
})
export class PosComponent implements OnInit {

  loading = false;
  itemList: PosProduct[] = new Array();
  prod: PosProduct = new PosProduct();

  //Insert new entry incase of shift and enter key press
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode == 13 && e.shiftKey ) {
      this.itemList.push(this.prod);
    }
  }

  initializeProduct(){
    this.prod.discount = 0;
    this.prod.mrp = 0;
    this.prod.quantity = 0;
    this.prod.total = 0;
    this.prod.itemCode = '';
    this.prod.itemName = '';
  }

  constructor(){
    this.initializeProduct();
  }

  ngOnInit(): void {
    this.itemList.push(this.prod);
  }



}
