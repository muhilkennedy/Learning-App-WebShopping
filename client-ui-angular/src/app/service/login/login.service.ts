import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  getGoogleConsentPageUrlEndpoint = "/social/getConsentPageUrl";
  socialGoogleLoginEndpoint = "/social/socialGoogleLogin";
  verifyGoogleKeyEndpoint = "/login/googleCustomerKeyAuth";
  autheticateCustomerTokenEndpoint = "/secure/customer/customerTokenAuthentication";
  registerCustomerEndpoint = "/login/registerCustomer";
  customerLoginEndpoint = "/login/customerAuthentication";
  sendRegisterOTPEndpoint = "/login/sendRegisterEmailOtp";
  forgotPasswordEndPoint = "/login/customerForgotPassword";
  verifyOtpEndPoint = "/login/customerOtpVerification";
  passwordUpdateEndpoint = "/login/customerPasswordUpdate";
  sendMobileOTPEndpoint = "/login/sendRegisterMobileOtp";
  registerMobileUserEndpoint = "/login/registerCustomerUsingMobile"

  constructor(private http: HttpClient) { }

  getGoogleConsentPageUrl(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.getGoogleConsentPageUrlEndpoint);
  }

  verifyGoogleKey(key): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('key', key);
    return this.http.post(environment.backendBaseUrl+this.verifyGoogleKeyEndpoint, uploadData);
  }

  autheticateCustomerToken(){
    return this.http.post(environment.backendBaseUrl+this.autheticateCustomerTokenEndpoint, null);
  }

  createCustomer(firstName, lastName, email, password, otp) : Observable<any>{
    const body = {
        customerInfo :{
          emailId : email,
            firstName : firstName,
            lastName : lastName,
            password : password
        },
        otp: otp
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.registerCustomerEndpoint, body, httpOptions);
  }

  createCustomerWithMobile(firstName, lastName, mobile, password, otp) : Observable<any>{
    const body = {
        customerInfo :{
            mobile : mobile,
            firstName : firstName,
            lastName : lastName,
            password : password
        },
        otp: otp
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.registerMobileUserEndpoint, body, httpOptions);
  }

  loginCustomer(email, password, rememberMe) : Observable<any>{
    const body = {
          customerInfo : {
            emailId : email,
            password : password
          },
          rememberMe: rememberMe
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.customerLoginEndpoint, body, httpOptions);
  }

  sendRegisterOtp(emailId) : Observable<any>{
    const body = {
      customerInfo : {
           emailId : emailId
        }
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.sendRegisterOTPEndpoint, body, httpOptions);
  }

  sendRegisterMobileOtp(mobile) : Observable<any>{
    const body = {
      customerInfo : {
           mobile : mobile
        }
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.sendMobileOTPEndpoint, body, httpOptions);
  }

  forgotPassWord(emailId) : Observable<any>{
    const body = {
      customerInfo : {
           emailId : emailId
        }
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.forgotPasswordEndPoint, body, httpOptions);
  }

  verifyOTP(emailId, otp) : Observable<any>{
    const body = {
      customerInfo : {
           emailId : emailId
        },
      otp: otp
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.verifyOtpEndPoint, body, httpOptions);
  }

  updatePassword(emailId, password) : Observable<any>{
    const body = {
      customerInfo : {
           emailId : emailId,
           password: password
        }
    };
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.put(environment.backendBaseUrl+this.passwordUpdateEndpoint, body, httpOptions);
  }

  googleSocialLogin(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
      };
      return this.http.post(environment.backendBaseUrl+this.socialGoogleLoginEndpoint, body, httpOptions);
  }

}
