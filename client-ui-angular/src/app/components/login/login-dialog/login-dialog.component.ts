import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login/login.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';
import { OrderHistoryComponent, DialogData } from '../../order-history/order-history.component';

declare var rsaencrypt: Function;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  emailId: string;
  otp: string;
  isOtpSent = false;
  newPassword: string;

  loading=false;

  constructor(
    public dialogRef: MatDialogRef<OrderHistoryComponent>, private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private tenantStore: TenantStoreService,
    private commonService: CommonsService, private _snackBar: MatSnackBar) {
      //data assignments
  }

  ngOnInit(): void {
  }

  sendOtp(){
    this.loading = true;
    if(this.emailId === undefined || this.emailId === null || this.emailId === ''){
      alert("EmailId is Mandatory!");
      return;
    }
    this.loginService.forgotPassWord(this.emailId)
                      .subscribe((resp:any) => {
                        if(resp.statusCode !== 200){
                          this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          return;
                        }
                        this.loading = false;
                        this.isOtpSent = true;
                      },
                      (error:any) => {
                        this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        this.isOtpSent = true;
                      });
  }

  verifyOtp(){
    this.loading = true;
    if(this.otp === undefined || this.otp === null || this.otp === ''){
      this._snackBar.open('OTP is Mandatory : ', 'OK', this.commonService.alertoptionsError);
      return;
    }
    if(this.newPassword === undefined || this.newPassword === null || this.newPassword === ''){
      this._snackBar.open('Password is Mandatory', 'OK', this.commonService.alertoptionsError);
      return;
    }
    this.loginService.verifyOTP(this.emailId, this.otp)
                      .subscribe((resp:any) => {
                        if(resp.statusCode !== 200){
                          this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          this.loading = false;
                          return;
                        }
                        else{
                          this.loginService.updatePassword(this.emailId,
                                                            rsaencrypt(this.newPassword, this.tenantStore.publicKey))
                                            .subscribe((resp:any) => {
                                              if(resp.statusCode !== 200){
                                                this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                                                return;
                                              }
                                              this.loading = false;
                                              this.dialogRef.close();
                                              this._snackBar.open('Password Updated Successfully!' + resp.errorMessages, 'OK', this.commonService.alertoptionsSuccess);
                                            },
                                            (error:any) => {
                                              this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                                              this.loading = false;
                                            });
                        }
                      },
                      (error:any) => {
                        this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        this.loading = false;
                      });
  }

}
