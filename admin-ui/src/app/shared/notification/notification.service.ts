import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  getAllNotificationEndpoint = "/secure/admin/pushNotification/getNotifications";
  deleteNotificationEndpoint = "/secure/admin/pushNotification/deleteNotification";

  getAllProductNotificationEndpoint = "/secure/admin/pushNotification/getProductNotifications";
  deleteProductNotificationEndpoint = "/secure/admin/pushNotification/deleteProductNotification";

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getAllNotificationEndpoint);
  }

  deleteNotification(id): Observable<any>{
    const httpOptions = {
      params: {id: id}
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteNotificationEndpoint, httpOptions);
  }

  getAllProductNotifications(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getAllProductNotificationEndpoint);
  }

  deleteProductNotification(id): Observable<any>{
    const httpOptions = {
      params: {id: id}
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteProductNotificationEndpoint, httpOptions);
  }

}
