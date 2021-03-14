import {MatSnackBar} from '@angular/material/snack-bar';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { OrderService } from 'src/app/service/order/order.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  loading = false;
  buttonLoading = false;

  constructor(public userStore: UserStoreService, private commonService: CommonsService,
              private cartService: CartService, private loginService: LoginService,
              private orderService: OrderService, private router: Router,
              private _snackBar: MatSnackBar) { }

  couponDetails:any;
  pincodeDetails:any;
  cartItems:any[];
  customerAddress:any[];
  addressSelected:any;
  redeemLoyality = false;

  city:string;
  state:string;
  street:string;
  door:string;
  mobile:string;

  maxDiscountlimit = 0;

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
    this.redeemLoyality = this.commonService.isRedeemLoyality;
    this.couponDetails = this.commonService.couponDetails;
    this.pincodeDetails = this.commonService.pincodeDetails;
    this.cartItems = this.userStore.cartItems;
    this.customerAddress = this.userStore.customerAddress;
  }

  cartSubtotal():number{
    let total = 0;
    this.cartItems.forEach(item => {
      total = total + this.calculateTotal(item);
    })
    return total;
  }

  calculateTotal(item):number{
    return this.calculatePrice(item) * item.quantity;
  }

  calculatePrice(item):number{
    let product = item.product;
    if(product.offer > 0){
      return product.sellingCost;
    }
    return product.cost;
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
    let loyality = 0;
    if(this.redeemLoyality){
      this.commonService.isRedeemLoyality = true;
      //deactivate coupon
      this.couponDetails = null;
      this.commonService.couponDetails = null;
      loyality = this.userStore.loyalityPoints;
    }
    if((this.couponDetails !== undefined && this.couponDetails !== null)){
      let total = this.calculateCouponApplied() + this.calculateDeliveryCharge();
      if(loyality > total){
        return 0;
      }
      return total - loyality;
    }
    let total = this.cartSubtotal() + this.calculateDeliveryCharge();
    if(loyality > total){
      return 0;
    }
    return total - loyality;
  }

  calculateCouponApplied(){
    if((this.couponDetails !== undefined && this.couponDetails !== null)){
      let couponDiscountValue = (this.cartSubtotal()*this.couponDetails.discount)/100;
      if(couponDiscountValue >=  this.commonService.couponDetails.maxDiscountLimit){
        return this.cartSubtotal() - this.commonService.couponDetails.maxDiscountLimit;
      }
      else{
        return this.cartSubtotal() - couponDiscountValue;
      }
    }
  }

  addAddress(){
    this.loading = true;
    this.cartService.addAddress(this.mobile, this.door, this.street, this.city, this.state,
                                this.pincodeDetails.pincode)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.loginService.autheticateCustomerToken()
                                          .subscribe((resp:any) => {
                                            if(resp.statusCode === 200){
                                              this.userStore.customerAddress = resp.data.customerAddress;
                                              this.customerAddress = this.userStore.customerAddress;
                                            }
                                            this.loading = false;
                                            this._snackBar.open('Address added to Profile!', '', this.commonService.alertoptionsSuccess);
                                          },
                                          (error: any) => {
                                            this._snackBar.open('Something Went Wrong!', '', this.commonService.alertoptionsError);
                                          })
                      }
                      this.loading = false;
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                    })
  }

  placeOrder(){
    this.loading = true;
    this.buttonLoading = true;
    let coupon = null;
    let paymentMode = null;
    let addressId = null;
    let pincode = null;
    if(this.addressSelected === undefined || this.addressSelected === null){
      this._snackBar.open('Please Select a Address!', 'OK', this.commonService.alertoptionsWarn);
      this.loading = false;
      this.buttonLoading = false;
      return;
    }
    else{
      addressId = this.addressSelected.addressId;
      pincode = this.addressSelected.pincode;
    }
    if(this.couponDetails !== undefined && this.couponDetails !== null && this.couponDetails.couponId !== undefined){
      coupon = this.couponDetails.couponId;
    }
    this.cartService.getPinCodeDetails(pincode, null)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200 && resp.data != null){
                        this.orderService.placeOrder(coupon, paymentMode, addressId, this.getDeliveryCharge(), this.redeemLoyality)
                                          .subscribe((resp:any) => {
                                            if(resp.statusCode === 200){
                                              this.userStore.cartCount = 0;
                                              // alert("Order Placed Successfully!");
                                              this._snackBar.open('Order Placed Successfully!', '', this.commonService.alertoptionsSuccess);
                                              this.openOrders();
                                            }
                                            else{
                                              this._snackBar.open('Failed to Place Order! Contact Admin!', '', this.commonService.alertoptionsWarn);
                                            }
                                            this.loading = false;
                                            this.buttonLoading = false;
                                          },
                                          (error: any) => {
                                            this._snackBar.open('Something Went Wrong!', '', this.commonService.alertoptionsError);
                                          })
                      }
                      else{
                        this.couponDetails = undefined;
                        this.loading = false;
                        this.buttonLoading = false;
                        this._snackBar.open('Not Deliverable to this Pincode! Please select Another address!', 'OK', this.commonService.alertoptionsWarn);
                      }
                    },
                    (error: any) => {
                      this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                    })
  }

  openCart(){
    this.router.navigate(['/cart']);
  }

  openOrders(){
    this.router.navigate(['/orders']);
  }

}
