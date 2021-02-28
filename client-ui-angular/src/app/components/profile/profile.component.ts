import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { UserStoreService } from 'src/app/service/shared/user-store/user-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading = false;

  constructor(public userStore: UserStoreService, private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  updateMobile(){
    this.loading = true;
    this.profileService.updateMobileNumber(this.userStore.mobile)
                        .subscribe((resp:any) => {
                        if(resp.statusCode !== 200){
                          alert('Failed : ' + resp.errorMessages);
                        }
                        this.loading = false;
                        },
                        (error:any) => {
                          alert('Something went wrong!');
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
                          alert('Failed : ' + resp.errorMessages);
                        }
                        this.loading = false;
                        },
                        (error:any) => {
                          alert('Something went wrong!');
                        });
  }

}
