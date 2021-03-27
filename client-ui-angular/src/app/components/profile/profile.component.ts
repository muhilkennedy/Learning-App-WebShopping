import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading = false;

  constructor(public userStore: UserStoreService, private profileService: ProfileService,
              public commonService: CommonsService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  updateMobile(){
    this.loading = true;
    this.profileService.updateMobileNumber(this.userStore.mobile)
                        .subscribe((resp:any) => {
                        if(resp.statusCode !== 200){
                          this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          this.loading = false;
                          return;
                        }
                        this._snackBar.open('Updated Successfully !', 'OK', this.commonService.alertoptionsSuccess);
                        this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        });
  }

  isGeneratedEmail(email){
    if(email.includes(environment.tenantId+".com")){
      return true;
    }
    else{
      return false;
    }
  }

  updateEmail(){
    this.loading = true;
    this.profileService.updateEmail(this.userStore.emailId)
                        .subscribe((resp:any) => {
                        if(resp.statusCode !== 200){
                          this._snackBar.open('Failed : ' + resp.errorMessages, 'OK', this.commonService.alertoptionsError);
                          this.loading = false;
                          return;
                        }
                        this._snackBar.open('Updated Successfully !', 'OK', this.commonService.alertoptionsSuccess);
                        this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        });
  }

}
