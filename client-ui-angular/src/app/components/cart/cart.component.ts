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

  @Input()
  cartPage: boolean = true;

  ngOnInit(): void {
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
                          this.commonService.couponDetails = this.couponDetails;
                        }
                        if(pincode !== null && (this.pincodeDetails === undefined || this.pincodeDetails === null)){
                          this._snackBar.open('Not Deliverable to this Pincode!', 'OK', this.commonService.alertoptionsWarn);
                        }
                        if(coupon !== null && (this.couponDetails === null || this.couponDetails === undefined)){
                          this._snackBar.open('Coupon Not Applicable! pls try a valid code', 'OK', this.commonService.alertoptionsWarn);
                        }
                      }
                      this.couponLoading = false;
                    },
                    (error: any) => {
                      alert("Something went wrong!");
                    })
  }

  incrementItem(item){
    this.loading = true;
    item.quantity++;
    this.cartService.updateProductQuantity(item.product.productId, item.quantity)
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        item.quantity--;
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      alert("Something went wrong!");
                      item.quantity--;
                    })

  }

  decrementItem(item){
    this.loading = true;
    item.quantity--;
    this.cartService.updateProductQuantity(item.product.productId, item.quantity)
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        item.quantity++;
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      alert("Something went wrong!");
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
      return this.cartSubtotal() - (this.cartSubtotal()*this.couponDetails.discount)/100;
    }
  }

  gotoCheckout(){
    this.router.navigate(['/checkout']);
  }

  removeFromCart(prod){
    this.loading = true;
    this.cartService.removeProductFromCart(prod.productId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode !== 200){
                        alert("failed to remove from cart");
                      }
                      let index = 0;
                      this.cartItems.forEach(item => {
                        if(item.product.productId === prod.productId){
                          this.cartItems.splice(index, 1);
                          this.userStore.cartCount--;
                          this.loading = false;
                          return;
                        }
                        index++;
                      });
                      this.loading = false;
                    },
                    (error: any) => {
                      alert("Something went wrong!");
                    })
  }

}
