import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  innerWidth: any;
  currentRate = 0;

  reviewHeader = '';
  reviewContetnt = '';
  selectedRate = 0;
  quantity = 1;
  reviews: any[];

  loading = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  isMobileView(){
    if(this.innerWidth < 600){
      return true;
    }
    else{
      return false;
    }
  }

  constructor(private commonService: CommonsService, private activatedRoute: ActivatedRoute,
              private router: Router, private productService: ProductService,
              private cartService: CartService, private _snackBar: MatSnackBar,
              private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.onResize("event");
    window.scroll(0,0);
    this.loading = true;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      if(productId !== undefined && productId !== null && productId !== ''){
        //later need to make individual calls for multiple images
      }
    });

    if(this.commonService.selectedProduct != undefined){
      this.product = this.commonService.selectedProduct;
      this.currentRate = this.commonService.selectedProduct.productContent.productRating;
      this.getProductReviews();
    }
    else{
      //navigate to home
      this.router.navigate(['/home']);
    }

  }

  getProductImage(){
    let prod = this.product;
    return (prod.productImage !== undefined && prod.productImage !== null && prod.productImage.length > 0)?
            prod.productImage[0].image : null
  }

  addToCart(){
    if(this.userStore.active === undefined || this.userStore.active === null){
      this._snackBar.open('Please Login to Add to Cart', 'OK', this.commonService.alertoptionsWarn);
      return;
    }
    this.cartService.addProducToCartQuantity(this.product.productContent.productId, this.quantity)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.userStore.cartCount+=this.quantity;
                        this._snackBar.open('Added To cart Successfully', '', this.commonService.alertoptionsSuccess);
                      }
                      else{
                        this._snackBar.open('Failed : ' + resp.errorMessages, '', this.commonService.alertoptionsWarn);
                      }
                      this.loading = false;
                    },
                    (error:any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                      this.loading = false;
                    });
  }

  submitReview(){
    this.loading = true;
    this.productService.postReview(this.product.productContent.productId, this.reviewHeader, this.reviewContetnt, this.product.productContent.productReviewId, this.selectedRate)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.reviews = resp.dataList;
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                          this.loading = false;
                        });
  }

  getProductReviews(){
    this.productService.getProductReview(this.product.productContent.productReviewId)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.reviews = resp.dataList;
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                          this.loading = false;
                        });
  }

  getReviewLength(reviews){
    if(reviews !== undefined && reviews !== null){
      return this.reviews.length;
    }
    return 0;
  }

}
