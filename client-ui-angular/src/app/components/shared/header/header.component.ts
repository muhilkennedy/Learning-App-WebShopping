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

  constructor(public tenantStore: TenantStoreService, private router: Router,
              public userStore: UserStoreService, private cartService: CartService) { }

  ngOnInit(): void {
    if(this.isLoggedIn()){

    }
  }

  isLoggedIn(){
    if(this.userStore.emailId !== undefined && this.userStore.emailId !== ''
        && this.userStore.emailId !== null){
          return true;
        }
    return false;
  }

  openHome(){
    this.router.navigate(['/home']);
  }

  openContact(){
    this.router.navigate(['/contact']);
  }

  openLogin(){
    this.router.navigate(['/login']);
  }

  openProductList(){
    this.router.navigate(['/productList']);
  }

  openCart(){
    this.router.navigate(['/cart']);
  }

}
