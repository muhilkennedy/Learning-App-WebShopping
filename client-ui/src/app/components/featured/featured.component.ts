import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/service/home.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  featuredProducts: any[];
  productsToDisplay: any[] = new Array();
  productCount: number;
  currentEnd: number;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllFeaturedProducts()
                    .subscribe( (resp:any) => {
                      if(resp.statusCode === 200){
                        this.featuredProducts = resp.dataList;
                        this.productCount = this.featuredProducts.length;
                        this.setVisibleProduct(0);
                      }
                      else{
                        alert("Failed to Fetch Featured Products!");
                      }
                    },
                    (error:any) =>{
                      alert("Something went wrong... Try again later!");
                    } )
  }

  setVisibleProduct(from){
    this.productsToDisplay.length = 0;
    let count = 0;
    let i = 0;
    for(i=0; i>= this.productCount; i++){
      if(from >= i){
        count ++;
        this.productsToDisplay.push(this.featuredProducts[i]);
      }
      if(count === 2){
        this.currentEnd = 1;
        break;
      }
    }
  }

  calculateDiscountedPrice(product){
    return (product.cost - ((product.cost * product.offer) / 100));
  }

}
