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

  constructor(private userStore: UserStoreService, private commonService: CommonsService,
              private cartService: CartService, private loginService: LoginService,
              private orderService: OrderService, private router: Router) { }

  couponDetails:any;
  pincodeDetails:any;
  cartItems:any[];
  customerAddress:any[];
  addressSelected:any;

  city:string;
  state:string;
  street:string;
  door:string;
  mobile:string;

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
    if((this.couponDetails !== undefined && this.couponDetails !== null)){
      return this.calculateCouponApplied() + this.calculateDeliveryCharge();
    }
    return this.cartSubtotal() + this.calculateDeliveryCharge();
  }

  calculateCouponApplied(){
    if((this.couponDetails !== undefined && this.couponDetails !== null)){
      return this.cartSubtotal() - (this.cartSubtotal()*this.couponDetails.discount)/100;
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
                                          },
                                          (error: any) => {
                                            alert("Something went wrong!");
                                          })
                      }
                    },
                    (error: any) => {
                      alert("Something went wrong!");
                    })
  }

  placeOrder(){
    this.loading = true;
    this.buttonLoading = true;
    let coupon = null;
    let paymentMode = null;
    let addressId = null;
    if(this.addressSelected === undefined || this.addressSelected === undefined){
      alert("Please select the address!");
      this.loading = false;
      this.buttonLoading = false;
      return;
    }
    else{
      addressId = this.addressSelected;
    }
    if(this.couponDetails !== undefined && this.couponDetails !== null && this.couponDetails.couponId !== undefined){
      coupon = this.couponDetails.coupon;
    }
    this.orderService.placeOrder(coupon, paymentMode, addressId, this.getDeliveryCharge())
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.userStore.cartCount = 0;
                          alert("Order placed!");
                          this.openOrders();
                        }
                        else{
                          alert("Failed to place order!");
                        }
                        this.loading = false;
                        this.buttonLoading = false;
                      },
                      (error: any) => {
                        alert("Something went wrong!");
                      })
  }

  openCart(){
    this.router.navigate(['/cart']);
  }

  openOrders(){
    this.router.navigate(['/orders']);
  }

}
