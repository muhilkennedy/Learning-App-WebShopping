import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/_alert';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
// import { NgxImageCompressService } from 'ngx-image-compress';
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

  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  designation: string;
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
    private sanitizer: DomSanitizer) {
      //private imageCompress: NgxImageCompressService
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
    let address: any[] = this.userStore.employeeAddress;
  }

  checkImage(image) {
    if (image === undefined || image === null) {
      return this.defaultAvatar;
    }
    else {
      return this.sanitizer.bypassSecurityTrustUrl(image);;
    }
  }

  handleFileUpdate(files: FileList) {
    this.profilePic = URL.createObjectURL(files.item(0));
    if (this.isValidFile(files.item(0).name)) {
      this.fileToUpdate = files.item(0);
    }
    else {
      this.alertService.warn('Format not supported! Please upload jpeg/jpg file');
    }
  }

  isValidFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
      return true;
    }
    else {
      return false;
    }
  }

  save() {
    this.loading = true;
    this.profileService.updateEmployee(this.fileToUpdate, this.empId, this.firstName, this.lastName, this.email, this.mobile)
      .subscribe((resp: any) => {
        if (resp.statusCode === 200) {
          this.alertService.success('Updatde Successfully', this.alertoptions);
          this.userStore.profilePic = resp.data.profilePic;
        }
        else {
          this.alertService.error('Failed : ' + resp.errorMessages, this.alertoptions);
        }
        this.loading = false;
      },
        (error) => {
          this.alertService.error('Something went wrong', this.alertoptions);
          this.loading = false;
        });
  }

  updatePassword() {
    this.passwordLoading = true;
    this.profileService.updatePassword(rsaencrypt(this.oldPassword, this.tenantStore.publicKey), rsaencrypt(this.newPassword, this.tenantStore.publicKey))
      .subscribe((resp: any) => {
        if (resp.statusCode === 200) {
          this.alertService.success('Updatde Successfully', this.alertoptions);
          this.userStore.profilePic = resp.data.profilePic;
        }
        else {
          this.alertService.error('Failed : ' + resp.errorMessages, this.alertoptions);
        }
        this.passwordLoading = false;
      },
        (error) => {
          this.alertService.error('Something went wrong', this.alertoptions);
          this.passwordLoading = false;
        });
  }

  // imgResultBeforeCompress:string;
  // imgResultAfterCompress:string;
  // compressFile() {

  //   this.imageCompress.uploadFile().then(({image, orientation}) => {

  //     this.imgResultBeforeCompress = image;
  //     console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

  //     this.imageCompress.compressFile(image, orientation, 50, 50).then(
  //       result => {
  //         this.imgResultAfterCompress = result;
  //         console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));

  //         // create file from byte
  //         const imageName = fileName;
  //         // call method that creates a blob from dataUri
  //         const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
  //         //imageFile created below is the new compressed file which can be send to API in form data
  //         const imageFile = new File([result], imageName, { type: 'image/jpeg' });

  //       }
  //     );
  //   });
  // }

  /*file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  selectFile(event: any) {
    this.loading = true;
    var fileName: any;
    this.file = event.target.files[0];
    fileName = this.file['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl, fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  compressFile(image, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        //set image for preview
        this.profilePic = this.localCompressedURl;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const tt = this.imgResultAfterCompress.split(',')[1];
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
        //imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([result], imageName, { type: 'image/jpeg' });
        this.fileToUpdate = imageFile;

        this.loading = false;
      });
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }*/

}
