import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  placeOrderEndpoint = "/secure/orders/placeOrder";
  getCustomerOrders = "/secure/orders/getCustomerOrders";
  getCustomerPOSOrdersEndpoint = "/secure/orders/getPOSHistory";

  constructor(private http: HttpClient) { }

  placeOrder(coupon, payment, addressId, deliveryCharge, redeemLoyality): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('couponId', coupon);
    uploadData.append('paymentMode', payment);
    uploadData.append('addressId', addressId);
    uploadData.append('deliveryCharge', deliveryCharge);
    uploadData.append('redeemLoyality', redeemLoyality);
    return this.http.post(environment.backendBaseUrl+this.placeOrderEndpoint, uploadData);
  }

  getOrders(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.getCustomerOrders);
  }

  getCustomerPOSOrders(){
    return this.http.get(environment.backendBaseUrl+this.getCustomerPOSOrdersEndpoint);
  }

}
