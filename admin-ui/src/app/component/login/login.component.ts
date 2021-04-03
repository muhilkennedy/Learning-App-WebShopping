import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
import { AlertService } from '../../shared/_alert';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { constants } from 'buffer';
import { mixinInitialized } from '@angular/material/core';

declare var rsaencrypt: Function;

export function logdecorator(target, name, descriptor){
 const original = descriptor.value;

 descriptor.value = function(...args){
  console.log("Aruguments " + args + " were passed to " + name);
  const result = original.apply(this,args);
  return result;
 }

 return descriptor;
}

/*export function logClassdecorator(className){
  return (...args) => {
   console.log("Aruguments " + args + " were passed to Class" + className);
   return new className(args);
  }
 }
 @logClassdecorator
class test{
  constructor(arg){
    console.log("test class");
  }
}
const testClass = new test("test");*/

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  alertoptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  public loading = false;

  email: string;
  password: string;
  password1: string;
  password2: string;
  otp: string;
  showEmail = true;
  showOtp = false;
  showPassword = false;
  rememberMe = false;
  tenantLogo:any;
  tenantName: string;

  constructor(private router: Router,
      private tenantStore: TenantStoreService,
      private userService: UserStoreService,
      private loginService: LoginService,
      protected alertService: AlertService,
      private _snackBar: MatSnackBar,
      private cookieService: CookieService){
        this.tenantLogo = this.tenantStore.tenantLogo;
        this.tenantName = this.tenantStore.tenantName;
        this.initializeLogin();
  }

  @logdecorator
  initializeLogin(){
    console.log("Initialized Login Component");
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  password1FormControl = new FormControl('', [
    Validators.required
  ]);

  password2FormControl = new FormControl('', [
    Validators.required
  ]);

  otpFormControl = new FormControl('', [
    Validators.required
  ]);

  toggleRememberMe(){
    this.rememberMe = !this.rememberMe;
  }

  login(){
    if(this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')){
      this.alertService.warn('Email Field has Errors', this.alertoptions);
    }
    else if(this.passwordFormControl.hasError('required')){
      this.alertService.warn('Password is Required', this.alertoptions);
    }
    else if(this.email!=undefined && this.password!=undefined){
      this.loading = true;
      this.loginService.employeeLogin(this.email, rsaencrypt(this.password, this.tenantStore.publicKey), this.rememberMe)
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
                this.userService.pickUpOrders = resp.dataList[0].pickUpOrders;
                this.cookieService.set("EmailId", this.userService.emailId);
                // this.cookieService.set("JWT", this.userService.JwtToken);
                this.cookieService.set("JWT", this.userService.JwtToken, 90);
                // this.cookieService.set("JWT", this.userService.JwtToken, 365, null, null, true, "None");
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

  sendEmailOtp(){
    if(this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')){
      this._snackBar.open('Email Field has Errors', '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    else{
      this.loading = true;
      this.loginService.sendEmailOtp(this.email)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.showEmail = false;
                            this.showOtp = true;
                          }
                          else{
                            this._snackBar.open('Not Able to Send OTP', '', {
                             duration: 5000,
                             panelClass: ['error-snackbar']
                            });
                          }
                          this.loading = false;
                        },
                        (error) => {
                          this._snackBar.open('Something went wrong....try again later!', '', {
                            duration: 5000,
                            panelClass: ['error-snackbar']
                          });
                          this.loading = false;
                        });
    }
  }

  verifyOtp(){
    if(this.emailFormControl.hasError('required')){
      this._snackBar.open('Please enter Email OTP', '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    else{
      this.loading = true;
      this.loginService.verifyEmailOtp(this.email, this.otp)
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                            this.showOtp = false;
                            this.showPassword = true;
                          }
                          else{
                            this._snackBar.open('OTP Verification Failed', '', {
                             duration: 5000,
                             panelClass: ['error-snackbar']
                            });
                          }
                          this.loading = false;
                        },
                        (error) => {
                          this._snackBar.open('Something went wrong....try again later!', '', {
                            duration: 5000,
                            panelClass: ['error-snackbar']
                          });
                          this.loading = false;
                        });
    }
  }

  updatePassword(){
    if(this.password1FormControl.hasError('required') || this.password2FormControl.hasError('required')){
      this._snackBar.open('Please Enter the Password', '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    if(this.password1 === this.password2){
      this.loading = true;
      this.loginService.updatePassword(this.email, this.password1)
                       .subscribe((resp: any) => {
                         if(resp.statusCode === 200){
                          this._snackBar.open('Password Updated Successfully', '', {
                            duration: 3000,
                            panelClass: ['success-snackbar']
                          });
                          this.router.navigate(['/login']);
                         }
                         else{
                          this._snackBar.open('Failed to Update Password', '', {
                            duration: 5000,
                            panelClass: ['error-snackbar']
                          });
                         }
                         this.loading = false;
                       },
                       (error) => {
                          this._snackBar.open('Something went wrong....try again later!', '', {
                            duration: 5000,
                            panelClass: ['error-snackbar']
                          });
                          this.loading = false;
                       });
    }
    else{
      this._snackBar.open('Passwords do not match..', '', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

 }
