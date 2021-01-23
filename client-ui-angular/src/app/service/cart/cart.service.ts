import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCountEndpoint = "/secure/customer/getCustomerCartCount";
  addTocartEndpoint = "/secure/customer/addProductToCart";
  getCustomerEndpoint = "/secure/customer/getCustomerCart";
  updateQuantityEndpoint = "/secure/customer/updateProductQuantity";
  addAddressEndpoint = "/secure/customer/addCustomerAddress";
  removeFromCartEndpoint = "/secure/customer/removeProductFromCart";

  getPinCodeDetailsEndpoint = "/secure/orders/getPincodeAndCouponDetails";

  constructor(private http: HttpClient) { }

  getCartCount(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.cartCountEndpoint);
  }

  addProducToCart(id): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('productId', id);
    return this.http.post(environment.backendBaseUrl+this.addTocartEndpoint, uploadData);
  }

  getCustomerCart(){
    return this.http.get(environment.backendBaseUrl+this.getCustomerEndpoint);
  }

  updateProductQuantity(id, quantity){
    const uploadData = new FormData();
    uploadData.append('productId', id);
    uploadData.append('quantity', quantity);
    return this.http.post(environment.backendBaseUrl+this.updateQuantityEndpoint, uploadData);
  }

  getPinCodeDetails(pincode, coupon){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const httpOptions = {
      headers: requestHeaders,
      params: {
        pincode: pincode,
        coupon: coupon
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getPinCodeDetailsEndpoint, httpOptions);
  }

  addAddress(mobile, door, street, city, state, pin) : Observable<any>{
    const body = {
      customerAddress : [
        {
          doorNumber: door,
          street: street,
          city: city,
          state: state,
          pincode: pin,
          mobileContact: mobile
        }
      ]
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.addAddressEndpoint, body, httpOptions);
  }

  removeProductFromCart(id): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('productId', id);
    return this.http.post(environment.backendBaseUrl+this.removeFromCartEndpoint, uploadData);
  }


}
