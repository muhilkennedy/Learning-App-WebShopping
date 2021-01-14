import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

declare var rsaencrypt: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  googlereDirectUrl:string;
  loading = false;
  registerLoding = false;
  signInLoading = false;
  buttonLoading = false;
  buttonDisable = false;

  emailId:string;
  password:string;
  otp:string;
  fName:string;
  lName:string;
  mobile:string;
  rememberMe:boolean = false;

  constructor(private loginService: LoginService, private tenantStore: TenantStoreService,
              private route: Router, private cookieService: CookieService,
              private userStore: UserStoreService, private cartService: CartService) { }

  ngOnInit(): void {
    if(this.userStore.emailId !== undefined && this.userStore.emailId !== null){
      this.route.navigate(["/home"]);
    }
  }

  googleLogin(){
    this.loading = true;
    this.loginService.getGoogleConsentPageUrl()
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.googlereDirectUrl = resp.url;
                          window.location.href = this.googlereDirectUrl;
                        }
                        else{
                          alert('Failed : ' + resp.errorMessages);
                        }
                        this.loading = false;
                        },
                        (error:any) => {
                          alert('Something went wrong!');
                        });
  }

  registerCustomer(){
    this.registerLoding = true;
    this.loginService.createCustomer(this.fName, this.lName, this.emailId, rsaencrypt(this.password, this.tenantStore.publicKey), this.otp)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          alert("sucess!");
                        }
                        else{
                          alert('Failed : ' + resp.errorMessages);
                        }
                        this.registerLoding = false;
                        },
                        (error:any) => {
                          alert('Something went wrong!');
                        });
  }

  login(){
    this.signInLoading = true;
    this.loginService.loginCustomer(this.emailId, rsaencrypt(this.password, this.tenantStore.publicKey), this.rememberMe)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.userStore.JwtToken = resp.data.token;
                          this.userStore.active=resp.dataList[0].active;
                          this.userStore.emailId=resp.dataList[0].emailId;
                          this.userStore.customerAddress=resp.dataList[0].customerAddress;
                          this.userStore.userId=resp.dataList[0].customerId;
                          this.userStore.firstName=resp.dataList[0].firstName;
                          this.userStore.lastName=resp.dataList[0].lastName;
                          this.userStore.mobile=resp.dataList[0].mobile;
                          this.userStore.loyalityPoints=resp.dataList[0].loyalitypoint;
                          this.userStore.lastLogin=resp.dataList[0].lastLogin;
                          this.userStore.profilePic=resp.dataList[0].profilePic;
                          this.userStore.profilePicUrl=resp.dataList[0].profilePicUrl;
                          this.userStore.loginMode=resp.dataList[0].loginMode;

                          this.cookieService.deleteAll();
                          this.cookieService.set('CLIENTJWT', this.userStore.JwtToken, 90);

                          this.setCartItems();

                          this.route.navigate(["/home"]);
                        }
                        else{
                          alert('Failed : ' + resp.errorMessages);
                        }
                        this.signInLoading = false;
                        },
                        (error:any) => {
                          alert('Something went wrong!');
                        });
  }

  setCartItems(){
    this.cartService.getCartCount()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.userStore.cartCount = resp.data;
                      }
                      else{
                        alert('Failed : ' + resp.errorMessages);
                      }
                      },
                      (error:any) => {
                        alert('Something went wrong!');
                      });
  }

  sendRegisterOTP(){
    this.buttonLoading=true;
    this.buttonDisable = true;
    if(this.emailId === undefined || this.emailId === null || this.emailId === ''){
      alert("Email is mandatory!")
      this.buttonLoading = false;
      this.buttonDisable = false;
      return;
    }
    this.loginService.sendRegisterOtp(this.emailId)
                      .subscribe((resp:any) => {
                          if(resp.statusCode !== 200){
                            alert('Failed : ' + resp.errorMessages);
                            this.buttonDisable = false;
                          }
                          this.buttonLoading = false;
                      },
                      (error:any) => {
                        alert('Something went wrong!');
                        this.buttonDisable = false;
                      });
  }

}
