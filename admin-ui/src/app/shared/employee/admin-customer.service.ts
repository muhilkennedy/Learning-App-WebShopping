import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomerService {

    getAllCustomersEndPoint = "/secure/admin/customer/getAllCustomers";
    getAllCustomersCountEndPoint = "/secure/admin/customer/getAllCustomersCount";
    changeCustomerStatusEndPoint = "/secure/admin/customer/changeCustomerStatus";
                  
    constructor(private http: HttpClient) { }    
    
    getAllCustomersCount(): Observable<any>{
      return this.http.get(environment.backendBaseUrl+this.getAllCustomersCountEndPoint);
    }

    getAllCustomers(offset, limit): Observable<any>{

      //Set Headers
      let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
      .append('Offset', offset)
      .append('Limit', limit);
  
      const httpOptions = {
        headers: requestHeaders
      };
  
      return this.http.get(environment.backendBaseUrl+this.getAllCustomersEndPoint, httpOptions);
    }

    changeCustomerStatus(cust): Observable<any>{
      const httpOptions = {
        customerInfo: cust
      };
      return this.http.put(environment.backendBaseUrl+this.changeCustomerStatusEndPoint, httpOptions);
    }
}    