import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  logoutEndPoint = "/login/secure/employeeLogout";
  sendOtpEndpoint = "/login/employeeForgotPassword";
  verifyOtpEndpoint ="/login/employeeOtpVerification";
  updatePasswordEndpoint = "/login/employeePasswordUpdate";

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

  sendEmailOtp(email) : Observable<any>{
    const body = { emailId: email };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.sendOtpEndpoint, body, httpOptions);
  }

  verifyEmailOtp(email, otp) : Observable<any>{
    const body = { emailId: email , otp : otp};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.verifyOtpEndpoint, body, httpOptions);
  }

  updatePassword(email, pass) : Observable<any>{
    const body = { emailId: email , password: pass};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put(environment.backendBaseUrl+this.updatePasswordEndpoint, body, httpOptions);
  }

  logout() : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put(environment.backendBaseUrl+this.logoutEndPoint, httpOptions);
  }

}
