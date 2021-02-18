import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/service/login/login.service';
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private tenantStore: TenantStoreService) {
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
                          alert('Failed : ' + resp.errorMessages);
                          return;
                        }
                        this.loading = false;
                        this.isOtpSent = true;
                      },
                      (error:any) => {
                        alert('Something went wrong!');
                        this.isOtpSent = true;
                      });
  }

  verifyOtp(){
    this.loading = true;
    if(this.otp === undefined || this.otp === null || this.otp === ''){
      alert("OTP is Mandatory!");
      return;
    }
    if(this.newPassword === undefined || this.newPassword === null || this.newPassword === ''){
      alert("Password is Mandatory!");
      return;
    }
    this.loginService.verifyOTP(this.emailId, this.otp)
                      .subscribe((resp:any) => {
                        if(resp.statusCode !== 200){
                          alert('Failed : ' + resp.errorMessages);
                          this.loading = false;
                          return;
                        }
                        else{
                          this.loginService.updatePassword(this.emailId,
                                                            rsaencrypt(this.newPassword, this.tenantStore.publicKey))
                                            .subscribe((resp:any) => {
                                              if(resp.statusCode !== 200){
                                                alert('Failed : ' + resp.errorMessages);
                                                return;
                                              }
                                              this.loading = false;
                                              this.dialogRef.close();
                                              alert("Password Updated Successfully!");
                                            },
                                            (error:any) => {
                                              alert('Something went wrong!');
                                              this.loading = false;
                                            });
                        }
                      },
                      (error:any) => {
                        alert('Something went wrong!');
                        this.loading = false;
                      });
  }

}
