import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from '../../shared/task/task.service';
import { EmployeeService } from '../../shared/employee/employee.service';
import { OrdersService } from '../../shared/orders/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit{
  rightSide = false;
  public sidebarMinimized = false;
  public navItems = navItems;
  public finalNavItems: any[] = new Array();
  public defaultAvatar = "assets/img/avatars/Blank-Profile.jpg";
  public userPermissions: any[];
  public loading = false;
  public realmName = environment.tenantId;
  activeTaskCount = 0;
  now:number;
  orderCountInterval:any;

  constructor(public userStore: UserStoreService,
              private router: Router,
              private loginService: LoginService,
              private cookieService: CookieService,
              private taskService: TaskService,
              private empService: EmployeeService,
              private orderService: OrdersService,
              private _snackBar: MatSnackBar){

    this.userPermissions = this.userStore.employeePermissions;
    this.setViewsBasedOnPermisssions();

    setInterval(() => {
      this.now = Date.now();
    }, 1);

  }

  showNotifications(){
    this.rightSide = true;
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
          this.addNavItem("/report");
        }
        //manager permission
        if(permissionIds.includes(2)){
          // remove employee functionality
          this.addNavItem("/sales");
          this.addNavItem("/invoice-template");
        }
        //marketing permission
        if(permissionIds.includes(3)){
          // remove employee, sales and analytical functionality
          this.addNavItem("/pos");
          this.addNavItem("/orders");
          this.addNavItem("/product");
        }
        //support permission
        if(permissionIds.includes(4)){
          //remove employee, sales, analytical, product functionality
          this.addNavItem("/coupon");
          this.addNavItem("/media");
          this.addNavItem("/userHistory");
          // later user transaction history page has to be implemented
        }
      }
    }
  }

  ngOnInit(): void {
      let allowCall = this.cookieService.get('JWT');
      if(allowCall != null && allowCall != undefined && allowCall != ''){
        this.loginService.tokenAuth(this.cookieService.get('JWT'))
            .subscribe((resp:any) => {
            if(resp.statusCode === 200){
              this.userStore.JwtToken = this.cookieService.get('JWT');
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
              this.userStore.pickUpOrders = resp.data.pickUpOrders;
              this.userPermissions = this.userStore.employeePermissions;
              this.finalNavItems = new Array();
              this.setViewsBasedOnPermisssions();
              this.checkOrderCount();
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
      // }

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
    this.loading = true;
    this.loginService.lockEmployee()
                    .subscribe((resp:any) => {
                      this.userStore = null;
                      this.loading = false;
                      //in case of remember me functionality this has to modified
                      this.cookieService.deleteAll();
                      alert("Account Locked! Please contact admin to activate your account");
                      this.router.navigate(['/login']);
                    },
                    (error) => {
                      alert("Account Deactivation Failed!");
                    });
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  tasks(){
    this.router.navigate(['/task',true]);
  }

  toggleOrderPickup(){
    this.loading = true;
    this.empService.toggleOrderPickup()
                    .subscribe((resp : any) => {
                      if(resp.statusCode === 200){
                        this.userStore.pickUpOrders = !this.userStore.pickUpOrders;
                        this.checkOrderCount();
                      }
                      this.loading = false;
                    },
                    (error:any) => {
                      alert("something went wrong!")
                    })
  }

  checkOrderCount(){
    if(this.userStore.pickUpOrders){
      this.orderCountInterval = setInterval(() => { this.getNewOrdersCount() }, 10000);
    }
    else{
      clearInterval(this.orderCountInterval);
    }
  }

  newOrdersCount:number = 0;
  getNewOrdersCount(){
    this.orderService.getUnassignedOrdersCount()
                     .subscribe((resp:any)=>{
                        if(resp.statusCode === 200){
                          if(this.newOrdersCount !== resp.data){
                            let snackBarRef = this._snackBar.open('New Order(s) recieved...!', 'OPEN', {
                              duration: 5000,
                              panelClass: ['warn-snackbar'],
                              horizontalPosition: 'right',
                              verticalPosition: 'bottom'
                            });
                            snackBarRef.onAction().subscribe(()=> this.navigateToOrders());
                          }
                          this.newOrdersCount = resp.data;
                        }
                     },
                     (error:any)=>{
                       console.log("Failed to get new orders count!")
                     })
  }

  navigateToOrders(){
    this.router.navigate(['/orders']);
  }

}
