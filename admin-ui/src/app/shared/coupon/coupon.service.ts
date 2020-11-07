import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  createCouponEndpoint = "/secure/admin/coupon/createCoupon";
  getCouponsEndpoint = "/secure/admin/coupon/getAllCoupons";
  toggleCouponStatusEndpoint = "/secure/admin/coupon/toggleCouponStatus";
  deleteCouponEndpoint = "/secure/admin/coupon/deleteCoupon";

  constructor(private http: HttpClient) { }

  getAllCoupons(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.getCouponsEndpoint);
  }

  createCoupon(title, code, startDate, endDate, active, discount,
              freeShipping, userUsage): Observable<any>{
    const body = {
      title: title,
      code: code,
      discount: discount,
      startDate: startDate,
      endDate: endDate,
      freeShipping: freeShipping,
      perUserUsage: userUsage,
      active: active
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.createCouponEndpoint, body, httpOptions);
  }

  toggleCouponStatus(couponId): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('couponId', couponId);
    return this.http.put(environment.backendBaseUrl+this.toggleCouponStatusEndpoint, uploadData);
  }

  deleteCoupon(couponId){
    const httpOptions = {
      params: { couponId: couponId }
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteCouponEndpoint, httpOptions);
  }

}
