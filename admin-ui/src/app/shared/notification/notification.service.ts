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

}
