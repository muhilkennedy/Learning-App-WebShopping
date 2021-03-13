import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  getUnassignedOrdersCountEndpoint = "/secure/admin/orders/getUnassignedOrdersCount";
  getUnassignedOrdersEndpoint = "/secure/admin/orders/getUnassignedOrders";
  changeOrderStatusEndpoint = "/secure/admin/orders/changeOrderStatus";
  getAssignedOrdersEndpoint = "/secure/admin/orders/getAssignedOrders";
  getOrdersEndpoint = "/secure/admin/orders/getOrders";
  viewPDFEndpoint = "/secure/admin/orders/viewPdf";

  constructor(private http: HttpClient){}

  getUnassignedOrdersCount(){
    return this.http.get(environment.backendBaseUrl+this.getUnassignedOrdersCountEndpoint);
  }

  getUnassignedOrders(){
    return this.http.get(environment.backendBaseUrl+this.getUnassignedOrdersEndpoint);
  }

  changeOrderStatus(status, orderId, paymentMode){
    const uploadData = new FormData();
    uploadData.append('status', status);
    uploadData.append('orderId', orderId);
    uploadData.append('paymentMode', paymentMode);
    return this.http.post(environment.backendBaseUrl+this.changeOrderStatusEndpoint, uploadData);
  }

  getAssignedOrders(status){
    const httpOptions = {
      params: {status: status}
    };
    return this.http.get(environment.backendBaseUrl+this.getAssignedOrdersEndpoint, httpOptions);
  }

  getOrders(limit, offset, status, dateCondition, date){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
                                          .append('Offset', offset)
                                          .append('Limit', limit);
    const httpOptions = {
      headers: requestHeaders,
      params: {
        filterCondition: dateCondition,
        filterDate: date,
        filterStatus: status
      }
    }
    return this.http.get(environment.backendBaseUrl+this.getOrdersEndpoint, httpOptions);
  }

  getPDF(orderId){
    const options = { responseType: Blob  };
    return this.http.get<any>(environment.backendBaseUrl+this.viewPDFEndpoint,
                { responseType: 'arraybuffer' as 'json', params : {id : orderId} });
   }

}
