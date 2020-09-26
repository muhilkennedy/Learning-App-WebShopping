import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/_alert';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
declare var rsaencrypt: Function;

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading = false;
  passwordLoading = false;
  alertoptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  defaultAvatar = "assets/img/avatars/Blank-Profile.png";
  userInfo: any;

  firstName:string;
  lastName:string;
  email:string;
  mobile:number;
  designation:string;
  door: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  empId: number;
  fileToUpdate: File;
  profilePic: string;

  oldPassword: string;
  newPassword: string;

  constructor(private userStore: UserStoreService,
              private tenantStore: TenantStoreService,
              private alertService: AlertService,
              private profileService: ProfileService,
              private sanitizer: DomSanitizer){

  }

  ngOnInit(): void {
    this.userInfo = this.userStore;
    this.empId = this.userStore.userId;
    this.firstName = this.userStore.firstName;
    this.lastName = this.userStore.lastName;
    this.email = this.userStore.emailId;
    this.designation = this.userStore.designation;
    this.mobile = this.userStore.mobile;
    this.profilePic = this.userStore.profilePic;
    let address:any[] = this.userStore.employeeAddress;
  }

  checkImage(image){
    if(image === undefined || image === null){
      return this.defaultAvatar;
    }
    else{
      return this.sanitizer.bypassSecurityTrustUrl(image);;
    }
  }

  handleFileUpdate(files: FileList) {
    this.profilePic = URL.createObjectURL(files.item(0));
    this.fileToUpdate = files.item(0);
  }

  save(){
    this.loading = true;
    this.profileService.updateEmployee(this.fileToUpdate, this.empId, this.firstName, this.lastName, this.email, this.mobile)
                       .subscribe((resp:any) => {
                         if(resp.statusCode === 200){
                          this.alertService.success('Updatde Successfully', this.alertoptions);
                          this.userStore.profilePic = resp.data.profilePic;
                         }
                         else{
                          this.alertService.error('Failed : ' + resp.errorMessages, this.alertoptions);
                         }
                         this.loading=false;
                       },
                       (error) => {
                         this.alertService.error('Something went wrong', this.alertoptions);
                         this.loading=false;
                       });
  }

  updatePassword(){
    this.passwordLoading = true;
    this.profileService.updatePassword(rsaencrypt(this.oldPassword, this.tenantStore.publicKey), rsaencrypt(this.newPassword, this.tenantStore.publicKey))
                        .subscribe((resp:any) => {
                          if(resp.statusCode === 200){
                          this.alertService.success('Updatde Successfully', this.alertoptions);
                          this.userStore.profilePic = resp.data.profilePic;
                          }
                          else{
                          this.alertService.error('Failed : ' + resp.errorMessages, this.alertoptions);
                          }
                          this.passwordLoading=false;
                        },
                        (error) => {
                          this.alertService.error('Something went wrong', this.alertoptions);
                          this.passwordLoading=false;
                        });
  }

}
