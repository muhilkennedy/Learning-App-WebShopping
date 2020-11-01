import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  createPOSEndpoint = "/secure/admin/pos/createPOS";
  getPOSdataEndpoint = "/secure/admin/pos/getPOS"

  constructor(private http: HttpClient){}

  createPOS(mobile, payment, subTotal, products): Observable<any>{
    const body = {
      timeCreated: new Date().getTime(),
      mobile: mobile,
      paymentMode: payment,
      subTotal: subTotal,
      posProduct: products
     };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.createPOSEndpoint, body, httpOptions);
   }

   getPOSData(limit, offset){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
                                          .append('Offset', offset)
                                          .append('Limit', limit);
    const httpOptions = {
      headers: requestHeaders
    }
    return this.http.get(environment.backendBaseUrl+this.getPOSdataEndpoint, httpOptions);
   }

}
