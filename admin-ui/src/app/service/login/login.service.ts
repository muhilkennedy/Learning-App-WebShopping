import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as JsEncryptModule from 'jsencrypt';
import { UserStoreService } from '../userStore/user-store.service';
import { TenantStoreService } from '../tenantStore/tenant-store.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginEndpoint = "/login/employeeAuthentication";

  constructor(private http: HttpClient) {

  }

  employeeLogin(email, pass) : Observable<any>{
    const body = { emailId: email, password: pass };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.loginEndpoint, body, httpOptions);
  }
}
