import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  createPOSEndpoint = "/secure/admin/pos/createPOS";

  constructor(private http: HttpClient){}

  createPOS(mobile, payment, products): Observable<any>{
    const body = {
      mobile: mobile,
      paymentMode: payment,
      posProduct: products
     };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.createPOSEndpoint, body, httpOptions);
   }

}
