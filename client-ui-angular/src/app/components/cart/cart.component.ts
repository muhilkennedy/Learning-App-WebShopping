import { HostListener } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private commonService: CommonsService,
              private userStore: UserStoreService, private router: Router,
              private _snackBar: MatSnackBar) { }

  cartItems:any[] = new Array();
  loading = false;
  couponLoading = false;
  pincode:number = 603104;
  coupon:string;

  pincodeDetails:any;
  couponDetails:any;

  maxDiscountlimit:number = 0;

  @Input()
  cartPage: boolean = true;

  public innerWidth: any;
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

  ngOnInit(): void {
    this.onResize(event);
    if(this.userStore !== undefined && this.userStore.emailId !== undefined){
      this.loading = true;
      this.cartService.getCustomerCart()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.cartItems = resp.dataList;
                        this.userStore.cartItems = this.cartItems;
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something Went Wrong!', '', this.commonService.alertoptionsError);
                    })
      this.setPinAndCouonDetails(this.pincode, null);
    }
    else{
      alert("Please Login to Access Cart!");
      this.router.navigate(['/login']);
    }
  }

  setPinAndCouonDetails(pincode, coupon){
    this.couponLoading = true;
    this.cartService.getPinCodeDetails(pincode, coupon)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        if(pincode !== null){
                          this.pincodeDetails = resp.data;
                          this.commonService.pincodeDetails = this.pincodeDetails;
                        }
                        if(coupon !== null){
                          this.couponDetails = resp.dataList !== undefined && resp.dataList !== null &&resp.dataList.length>0 ?
                                               resp.dataList[0]: null;
                          if(coupon !== null && (this.couponDetails === null || this.couponDetails === undefined)){
                            this._snackBar.open('Coupon Not Applicable! pls try a valid code', 'OK', this.commonService.alertoptionsWarn);
                            this.couponLoading = false;
                            return;
                          }
                          this.maxDiscountlimit = this.couponDetails.maxDiscountLimit;
                          this.commonService.couponDetails = this.couponDetails;
                          if(this.cartSubtotal() <= this.couponDetails.minTotalLimit){
                            this._snackBar.open("Add " + (this.couponDetails.minTotalLimit-this.cartSubtotal())
                                                + " (inr) more to apply this coupon!", 'ok', this.commonService.alertoptionsWarn);
                            this.couponLoading = false;
                            this.commonService.couponDetails = null;
                            this.maxDiscountlimit = 0;
                            return;

                          }
                        }
                        if(pincode !== null && (this.pincodeDetails === undefined || this.pincodeDetails === null)){
                          this.couponDetails = undefined;
                          this._snackBar.open('Not Deliverable to this Pincode!', 'OK', this.commonService.alertoptionsWarn);
                        }
                        if(coupon !== null && (this.couponDetails === null || this.couponDetails === undefined)){
                          this.couponDetails = undefined;
                          this._snackBar.open('Coupon Not Applicable! pls try a valid code', 'OK', this.commonService.alertoptionsWarn);
                        }
                      }
                      this.couponLoading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong.. try again later!', 'OK', this.commonService.alertoptionsError);
                    })
  }

  incrementItem(item){
    this.loading = true;
    item.quantity++;
    this.cartService.updateProductQuantity(item.product.productId, item.quantity)
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        item.quantity--;
                        this._snackBar.open('Failed : ' + resp.errorMessages, '', this.commonService.alertoptionsWarn);
                        this.loading = false;
                        return;
                      }
                      this.userStore.cartCount++;
                      this.loading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                      item.quantity--;
                      this.loading = false;
                    })

  }

  isMinusVisible(item){
    let quantity = item.quantity-1;
    if(quantity < 0){
      return false;
    }
    else{
      return true;
    }
  }

  decrementItem(item){
    this.loading = true;
    item.quantity--;
    this.cartService.updateProductQuantity(item.product.productId, item.quantity)
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        item.quantity++;
                        this.loading = false;
                        return;
                      }
                      this.userStore.cartCount--;
                      if(item.quantity < 1){
                        let i = 0;
                        this.cartItems.forEach(element => {
                          if(element.product.productId === item.product.productId){
                            this.cartItems.splice(i,1);
                          }
                          i++;
                        });
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                      item.quantity--;
                    })
  }

  calculatePrice(item):number{
    let product = item.product;
    if(product.offer > 0){
      return product.sellingCost;
    }
    return product.cost;
  }

  calculateTotal(item):number{
    return this.calculatePrice(item) * item.quantity;
  }

  cartSubtotal():number{
    let total = 0;
    this.cartItems.forEach(item => {
      total = total + this.calculateTotal(item);
    })
    return total;
  }

  calculateDeliveryCharge():number{
    if(this.pincodeDetails !== undefined && this.pincodeDetails !== null){
      if(this.cartSubtotal() >= this.pincodeDetails.minimumamtforfreedelivery
        || ((this.couponDetails !== undefined && this.couponDetails !== null) &&
              this.couponDetails.freeShipping === true)){
        return 0;
      }
      else{
        return this.pincodeDetails.deliverycharge;
      }
    }
    return -1;
  }

  getDeliveryCharge(){
    let deliveryCode = this.calculateDeliveryCharge();
    switch(deliveryCode){
      case -1 : return 'NA';
      case 0  : return 'Free Delivery';
      default : return deliveryCode;
    }
  }

  calculateTotalWithDeliveryCharge(){
    if((this.couponDetails !== undefined && this.couponDetails !== null)){
      return this.calculateCouponApplied() + this.calculateDeliveryCharge();
    }
    return this.cartSubtotal() + this.calculateDeliveryCharge();
  }

  applyCoupon(){
    this.setPinAndCouonDetails(null, this.coupon);
  }

  checkDeliveryCode(){
    this.setPinAndCouonDetails(this.pincode, null);
  }

  calculateCouponApplied(){
    if((this.couponDetails !== undefined && this.couponDetails !== null)){
      let couponDiscountValue = (this.cartSubtotal()*this.couponDetails.discount)/100;
      if(couponDiscountValue >= this.maxDiscountlimit){
        return this.cartSubtotal() - this.maxDiscountlimit;
      }
      else{
        return this.cartSubtotal() - couponDiscountValue;
      }
    }
  }

  gotoCheckout(){
    this.router.navigate(['/checkout']);
  }

  removeFromCart(item){
    this.loading = true;
    let prod = item.product;
    this.cartService.removeProductFromCart(prod.productId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        this._snackBar.open('Failed to Remove from Cart!', 'OK', this.commonService.alertoptionsError);
                      }
                      let index = 0;
                      this.cartItems.forEach(item => {
                        if(item.product.productId === prod.productId){
                          this.cartItems.splice(index, 1);
                          this.userStore.cartCount = this.userStore.cartCount-item.quantity;
                          this.loading = false;
                          return;
                        }
                        index++;
                      });
                      this.loading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                    })
  }

  offerPage(){
    this.commonService.cartTotal = this.cartSubtotal();
    this.commonService.cartItems = this.cartItems;
    this.router.navigate(['/offerPage']);
  }

  clearCart(){
    this.loading = true;
    this.cartService.clearCart()
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        this._snackBar.open('Failed to Clear Cart!', 'OK', this.commonService.alertoptionsError);
                      }
                      else{
                        this.commonService.cartTotal = 0;
                        this.cartItems.length = 0;
                        this.userStore.cartCount = 0;
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                      this.loading = false;
                    })
  }

  canProceed(){
    if(this.cartItems.length > 0){
      return true;
    }
    else{
      return false;
    }
  }

}
