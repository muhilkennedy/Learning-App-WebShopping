import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { CartService } from './service/cart/cart.service';
import { LoginService } from './service/login/login.service';
import { CommonsService } from './service/shared/commons/commons.service';
import { TenantStoreService } from './service/shared/tenant-store/tenant-store.service';
import { UserStoreService } from './service/shared/user-store/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title:string;
  constructor(private tenantStore: TenantStoreService, private titleService: Title,
              private userStore: UserStoreService, private cookieService: CookieService,
              private loginService: LoginService, private cartService: CartService,
              public commonServie: CommonsService){
    this.title=environment.tenantId;
  }

  appIcon: HTMLLinkElement = document.querySelector("#appIcon");
  ngOnInit() {
    this.appIcon.href = this.tenantStore.tenantLogo;
    this.titleService.setTitle(this.tenantStore.tenantName);
    let token = this.cookieService.get('CLIENTJWT');
    if(token !== null && token !== undefined && token.length > 20){
      this.loginService.autheticateCustomerToken()
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.userStore.JwtToken = token;
                            this.userStore.active=resp.data.active;
                            this.userStore.emailId=resp.data.emailId;
                            this.userStore.customerAddress=resp.data.customerAddress;
                            this.userStore.userId=resp.data.customerId;
                            this.userStore.firstName=resp.data.firstName;
                            this.userStore.lastName=resp.data.lastName;
                            this.userStore.mobile=resp.data.mobile;
                            this.userStore.loyalityPoints=resp.data.loyalitypoint;
                            this.userStore.lastLogin=resp.data.lastLogin;
                            this.userStore.profilePic=resp.data.profilePic;
                            this.userStore.profilePicUrl=resp.data.profilePicUrl;
                            this.userStore.loginMode=resp.data.loginMode;

                            this.setCartItems();

                          }
                          else{
                            alert('Failed : ' + resp.errorMessages);
                          }
                          },
                          (error:any) => {
                            alert('Something went wrong!');
                          });
    }
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
}
