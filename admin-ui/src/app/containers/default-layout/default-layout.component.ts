import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  public finalNavItems: any[] = new Array();
  public profilePic = "assets/img/avatars/Blank-Profile.jpg";
  public userPermissions: any[];

  constructor(public userStore: UserStoreService, private router: Router, private loginService: LoginService){

    if(this.userStore.profilePic != null){
      this.profilePic = this.userStore.profilePic;
    }
    this.userPermissions = this.userStore.employeePermissions;


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
            this.addNavItem("/userHistory");
            // later user transaction history page has to be implemented
          }
        }
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

  ngOnInit(): void {
    if(this.userStore==undefined || this.userStore.userId == undefined){
      this.router.navigate(['/login']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.loginService.logout()
                      .subscribe((resp:any) => {
                        this.userStore = null;
                        this.router.navigate(['/login']);
                      },
                      (error) => {
                        alert("logout failed");
                      });

  }
}
