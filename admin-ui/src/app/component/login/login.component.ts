import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
import { AlertService } from '../../shared/_alert';

declare var rsaencrypt: Function;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  public loading = false;

  email: string;
  password: string;

  constructor(private router: Router,
      private tenantStore: TenantStoreService,
      private userService: UserStoreService,
      private loginService: LoginService,
      protected alertService: AlertService){
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ])

  login(){
    if(this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')){
      this.alertService.warn('Email Field has Errors', this.options);
    }
    else if(this.passwordFormControl.hasError('required')){
      this.alertService.warn('Password is Required', this.options);
    }
    else if(this.email!=undefined && this.password!=undefined){
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
                this.alertService.error(resp.status + " : " + resp.errorMessages);
              }
              this.loading=false;
          },
          (error) => {
            this.alertService.error('Login failed!');
            this.loading=false;
          }
      );
    }
    else{
      this.alertService.info('something is wrong.... try refreshing!');
    }
  }

 }
