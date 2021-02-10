import {CartService} from '../../service/cart/cart.service';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss']
})
export class OfferPageComponent implements OnInit {

  couponDetails:any;
  pincodeDetails:any;

  couponLoading = false;
  pincode:number = 603104;
  coupon:string;

  cartTotal:number;
  cartItems:any[] = new Array();

  maxDiscountlimit:number = 0;

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

  constructor(private commonService: CommonsService, private cartService: CartService,
    private userStore: UserStoreService, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.onResize(event);
    this.couponDetails = this.commonService.couponDetails;
    this.pincodeDetails = this.commonService.pincodeDetails;
    this.cartTotal = this.commonService.cartTotal;
    this.cartItems = this.commonService.cartItems;
  }

  applyCoupon(){
    this.setPinAndCouonDetails(null, this.coupon);
  }

  checkDeliveryCode(){
    this.setPinAndCouonDetails(this.pincode, null);
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
                            alert("Add " + (this.couponDetails.minTotalLimit-this.cartSubtotal())
                                  + " (inr) more to apply this coupon!");
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
                      alert("Something went wrong!");
                    })
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

  gotoCheckout(){
    this.router.navigate(['/checkout']);
  }

}
