import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login/login.service';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
declare var rsaencrypt: Function;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  public loading = false;

  email: string;
  password: string;

  constructor(private router: Router,
      private tenantStore: TenantStoreService,
      private userService: UserStoreService,
      private loginService: LoginService){
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ])

  login(){
    if(this.email!=undefined && this.password!=undefined){
      this.loading = true;
      this.loginService.employeeLogin(this.email, rsaencrypt(this.password, this.tenantStore.publicKey))
          .subscribe(
            (resp:any) => {
              if(resp.statusCode === 200){
                this.userService.JwtToken = resp.data.token;
                this.userService.active = resp.dataList[0].active;
                this.userService.designation = resp.dataList[0].designation;
                this.userService.emailId = resp.dataList[0].emailId;
                this.userService.mobile = resp.dataList[0].mobile;
                this.userService.firstName = resp.dataList[0].firstName;
                this.userService.lastName = resp.dataList[0].lastName;
                this.userService.lastLogin = resp.dataList[0].lastLogin;
                this.userService.profilePic = resp.dataList[0].profilePic;
                this.userService.userId = resp.dataList[0].employeeId;
                this.userService.employeeAddress = resp.dataList[0].employeeAddress;
                this.userService.employeePermissions = resp.dataList[0].employeePermissions;
                this.router.navigate(['/dashboard']);
              }
              else{
                alert(resp.status + " : " + resp.errorMessages)
              }
              console.log(resp);
              this.loading=false;
          },
          (error) => {
              alert("Login failed");
              this.loading=false;
          }
      );
    }
    else{
      alert("login error");
    }
  }

 }
