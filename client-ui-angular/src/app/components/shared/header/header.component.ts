import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHomeClicked = true;
  isShowNowClicked = false;
  isContactClicked = false;

  constructor(public tenantStore: TenantStoreService, private router: Router,
              public userStore: UserStoreService, private cartService: CartService,
              public cookieService: CookieService) { }

  ngOnInit(): void {

  }

  isLoggedIn(){
    if(this.userStore.emailId !== undefined && this.userStore.emailId !== ''
        && this.userStore.emailId !== null){
          return true;
        }
    return false;
  }

  logout(){
    this.userStore = undefined;
    // this.userStore = null;
    this.cookieService.deleteAll();
    this.openHome();
    window.location.reload();
  }

  openHome(){
    this.setActiveMenu(true, false, false);
    this.router.navigate(['/home']);
  }

  openContact(){
    this.setActiveMenu(false, false, true);
    this.router.navigate(['/contact']);
  }

  openLogin(){
    this.router.navigate(['/login']);
  }

  openProductList(){
    this.setActiveMenu(false, true, false);
    this.router.navigate(['/productList']);
  }

  openCart(){
    this.router.navigate(['/cart']);
  }

  openOrders(){
    this.router.navigate(['/orders']);
  }

  openPOSOrders(){
    if(this.userStore.mobile === undefined || this.userStore.mobile === null){
      alert("Please Update Mobile Number to View POS Details");
      return;
    }
    this.router.navigate(['/posOrders']);
  }

  openProfie(){
    this.router.navigate(['/profile']);
  }

  setActiveMenu(home, shop, contact){
    this.isHomeClicked = home;
    this.isShowNowClicked = shop;
    this.isContactClicked = contact;
  }

}
