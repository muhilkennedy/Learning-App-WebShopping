import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  updateMobileEndpoint = "/secure/customer/updateMobile";
  updateEmailEndpoint = "/secure/customer/updateEmail";

  constructor(private http: HttpClient) { }

  updateMobileNumber(mobile): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('mobile', mobile);
    return this.http.post(environment.backendBaseUrl+this.updateMobileEndpoint, uploadData);
  }

  updateEmail(mobile): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('email', mobile);
    return this.http.post(environment.backendBaseUrl+this.updateEmailEndpoint, uploadData);
  }

}
