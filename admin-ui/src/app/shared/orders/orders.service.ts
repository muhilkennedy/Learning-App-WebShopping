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
  constructor(private http: HttpClient){}

  getUnassignedOrdersCount(){
    return this.http.get(environment.backendBaseUrl+this.getUnassignedOrdersCountEndpoint);
  }

  getUnassignedOrders(){
    return this.http.get(environment.backendBaseUrl+this.getUnassignedOrdersEndpoint);
  }

  changeOrderStatus(status, orderId){
    const uploadData = new FormData();
    uploadData.append('status', status);
    uploadData.append('orderId', orderId);
    return this.http.post(environment.backendBaseUrl+this.changeOrderStatusEndpoint, uploadData);
  }

}
