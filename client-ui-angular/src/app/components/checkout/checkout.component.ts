import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  loading = false;

  constructor(private userStore: UserStoreService, private commonService: CommonsService,
              private cartService: CartService, private loginService: LoginService) { }

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

  ngOnInit(): void {
    this.couponDetails = this.commonService.couponDetails;
    this.pincodeDetails = this.commonService.pincodeDetails;
    this.cartItems = this.userStore.cartItems;
    this.customerAddress = this.userStore.customerAddress;
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
      return product.cost-((product.cost*product.offer)/100)
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
    this.cartService.addAddress(this.mobile, this.door, this.street, this.city, this.state, this.pincodeDetails.pincode)
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
                      this.loading = false;
                    },
                    (error: any) => {
                      alert("Something went wrong!");
                    })
  }

}
