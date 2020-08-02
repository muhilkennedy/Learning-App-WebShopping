import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  public finalNavItems: any[] = new Array();
  public defaultAvatar = "assets/img/avatars/Blank-Profile.jpg";
  public userPermissions: any[];
  public loading = false;

  constructor(public userStore: UserStoreService,
              private router: Router,
              private loginService: LoginService,
              private cookieService: CookieService){

    this.userPermissions = this.userStore.employeePermissions;
    this.setViewsBasedOnPermisssions();

  }

  checkImage(image){
    if(image === undefined || image === null){
      return this.defaultAvatar;
    }
    else{
      return image;
    }
  }

  removeNavItem(itemUrl: string){
    let i = 0;
    navItems.forEach(item =>{
      if(item.url === itemUrl){
        navItems.splice(i,1);
      }
      i++;
    });
  }

  addNavItem(itemUrl: string){
    let i = 0;
    this.navItems.forEach(item =>{
      if(item.url === itemUrl){
        this.finalNavItems.push(item);
      }
      i++;
    });
  }

  addNavTitle(name:string){
    let i = 0;
    this.navItems.forEach(item =>{
      if(item.title === true && item.name === name){
        this.finalNavItems.push(item);
      }
      i++;
    });
  }

  setViewsBasedOnPermisssions(){
    if(this.userPermissions != undefined && this.userPermissions.length > 0){
      let permissionIds = new Array(4);
      this.userPermissions.forEach(permission => {
        permissionIds.push(permission.permission.permissionId);
      });
      if(permissionIds.length < 1){
        alert("no permissions given.... contact admin!");
      }
      else{
        this.addNavItem("/dashboard");
        this.addNavTitle("Features");
        //admin permission
        if(permissionIds.includes(1)){
          //allow all access
          this.addNavItem("/employee");
        }
        //manager permission
        if(permissionIds.includes(2)){
          // remove employee functionality
          this.addNavItem("/sales");
          this.addNavItem("/invoice-template");
          this.addNavItem("/report");
        }
        //marketing permission
        if(permissionIds.includes(3)){
          // remove employee, sales and analytical functionality
          this.addNavItem("/product");
          this.addNavItem("/coupon");
        }
        //support permission
        if(permissionIds.includes(4)){
          //remove employee, sales, analytical, product functionality
          this.addNavItem("/media");
          this.addNavItem("/userHistory");
          // later user transaction history page has to be implemented
        }
      }
    }
  }

  ngOnInit(): void {
    if(!environment.production && (this.userStore.JwtToken === undefined ||  this.userStore.JwtToken === null)){
      // This is only for dev purposes(relogin as admin incase of refresh)
      let test =this.cookieService.get('JWT');
      this.loginService.tokenAuth(this.cookieService.get('JWT'))
                       .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.userStore.active = resp.data.active;
                          this.userStore.designation = resp.data.designation;
                          this.userStore.emailId = resp.data.emailId;
                          this.userStore.mobile = resp.data.mobile;
                          this.userStore.firstName = resp.data.firstName;
                          this.userStore.lastName = resp.data.lastName;
                          this.userStore.lastLogin = resp.data.lastLogin;
                          this.userStore.profilePic = resp.data.profilePic;
                          this.userStore.userId = resp.data.employeeId;
                          this.userStore.employeeAddress = resp.data.employeeAddress;
                          this.userStore.employeePermissions = resp.data.employeePermissions;
                          this.userPermissions = this.userStore.employeePermissions;
                          this.finalNavItems = new Array();
                          this.setViewsBasedOnPermisssions();
                        }
                        else{
                          alert(resp.status + " : " + resp.errorMessages);
                          this.router.navigate(['/login']);
                        }
                       },
                       (error) => {
                         this.router.navigate(['/login']);
                       })
    }
    else if(this.userStore==undefined || this.userStore.userId == undefined){
      this.router.navigate(['/login']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.loading = true;
    this.loginService.logout()
                      .subscribe((resp:any) => {
                        this.userStore = null;
                        this.loading = false;
                        //in case of remember me functionality this has to modified
                        this.cookieService.deleteAll();
                        this.router.navigate(['/login']);
                      },
                      (error) => {
                        alert("logout failed");
                      });

  }

  lockProfile(){
    this.router.navigate(['/lockAccount']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }
}
