import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  carouselClass = "carousel-item";
  activeClass = "active";

  items =['item1','item2', 'item3','item4', 'item5','item6', 'item7','item8'];
  itemsToDisplay:string[] = new Array();

  beginOffset:number;
  endOffset:number;

  constructor() { }

  ngOnInit(): void {
    // this.items = ['item1','item2', 'item3','item4', 'item5','item6', 'item7','item8'];
    let i = 1;
    //load initial 4 items only
    for(let item of this.items){
      this.itemsToDisplay.push(item);
      if(i++ >= 4){
        break;
      }
    }
    this.beginOffset = 0;
    this.endOffset = i-1;
  }

  next(){
    this.itemsToDisplay.shift();
    this.itemsToDisplay.push(this.items[this.endOffset]);
    this.endOffset++;
    this.beginOffset++;
  }

  prev(){
    this.itemsToDisplay.pop();
    this.itemsToDisplay.unshift(this.items[this.beginOffset-1]);
    this.endOffset--;
    this.beginOffset--;
  }

  getCarouselClass1(){
    return this.activeClass;
  }

  getCarouselClass2(){
    return this.carouselClass;
  }

}
