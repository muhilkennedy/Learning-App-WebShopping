import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { HomeService } from 'src/app/service/home/home.service';
import { ProductService } from 'src/app/service/product/product.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = true;
  mediaArray:any[] = new Array();

  mandateHomeMedia:any;
  homeMedia:any[] = new Array();
  homeBanner:any[] = new Array();
  homeMediaLength:number = 0;
  mandateBannerImage:any;
  homeBannerLength:number = 0;

  featuresProducts:any[] = new Array();

  constructor(private homeService:HomeService, private tenantStore: TenantStoreService,
              private productService: ProductService, private userStore: UserStoreService,
              private router: Router, private cartService:CartService,
              private commonService:CommonsService) { }

  ngOnInit(): void {
    this.commonService.globalLoading = false;
    this.homeService.getAllHomeMedia()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.mediaArray = resp.dataList;
                        this.manipulateImages();
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      alert("Something went wrong!");
                    })
    this.productService.getAllFeaturedProducts()
                       .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.featuresProducts = resp.dataList;
                          }
                        },
                        (error: any) => {
                          alert("Something went wrong!");
                        })
  }

  manipulateImages(){
    let initialHomeImage = true;
    let initialBannerImage = true;
    this.mediaArray.forEach(media => {
      if(media.sliderShow === true){
        // if(initialBannerImage){
        //   this.mandateBannerImage = media;
        //   initialBannerImage = false;
        // }
        // else{
        //   this.homeBanner.push(media);
        // }
        this.homeBanner.push(media);
      }
      else{
        if(initialHomeImage){
          this.mandateHomeMedia = media;
          initialHomeImage = false;
        }
        else{
          this.homeMedia.push(media);
        }
      }
    });
    this.homeMediaLength = this.homeMedia.length;
    this.homeBannerLength = this.homeBanner.length;
  }

  isShopNow():boolean{
    if(this.mandateHomeMedia !== undefined && this.mandateHomeMedia.shopNow){
      return true
    }
    return false;
  }

  isContactNow():boolean{
    if(this.mandateHomeMedia !== undefined && this.mandateHomeMedia.contact){
      return true
    }
    return false;
  }

  calculateDiscountedPrice(product){
    return (product.cost - ((product.cost * product.offer) / 100));
  }

  getProductImage(prod){
    return (prod.productImage !== undefined && prod.productImage !== null && prod.productImage.length > 0)?
            prod.productImage[0].image : null
  }

  addToCart(prod){
    if(this.userStore.emailId === undefined || this.userStore.emailId === null){
      alert("Please Login to Add Items to Cart!");
      // this.router.navigate(['/login']);
    }
    else{
      this.cartService.addProducToCart(prod.productId)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          if(this.userStore.cartCount === undefined){
                            this.userStore.cartCount = 0;
                          }
                          this.userStore.cartCount++;
                        }
                        this.loading = false;
                      },
                      (error: any) => {
                        alert("Something went wrong!");
                      })
    }
  }

}