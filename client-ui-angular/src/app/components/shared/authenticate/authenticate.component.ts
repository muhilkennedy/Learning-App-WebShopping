import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  key:string;
  loading = false;

  constructor(private route: Router, private loginService: LoginService, private cartService: CartService,
              private userStore: UserStoreService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loading = true;
    let url: String = window.location.href;
    this.key = this.getParamValueQueryString('key',url);
    if(this.key !== undefined && this.key !== null && this.key != ''){
      this.loginService.verifyGoogleKey(this.key)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.userStore.JwtToken = resp.data;
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
                            this.cookieService.set("CLIENTJWT", this.userStore.JwtToken, 90);

                            this.setCartItems();

                            this.route.navigate(["/home"]);
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
    else{
      this.route.navigate(["/404"]);
    }
  }

  getParamValueQueryString( paramName , url) {
    let paramValue = new URL(url).searchParams;
    return paramValue.get(paramName);
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
