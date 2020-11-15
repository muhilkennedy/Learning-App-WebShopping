import { Component, OnInit } from '@angular/core';
import { TenantStoreService } from '../../../../service/tenantStore/tenant-store.service';
import { TenantService } from '../../../../shared/tenant/tenant.service';
import { AlertService } from '../../../../shared/_alert';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  editTenantEmail = false;
  editTenantBusinessEmail = false;
  editTenantContact = false;
  editTenantStreet = false;
  editTenantCity = false;
  editTenantPin = false;
  editTenantFacebook = false;
  editTenantTwitter = false;
  editTenantInsta = false;
  editTenantBusinessEmailPassword = false;
  editTenantLogo = false;
  editTenantGst = false;

  loadTenantEmail = false;
  loadTenantBusinessEmail = false;
  loadTenantContact = false;
  loadTenantStreet = false;
  loadTenantCity = false;
  loadTenantPin = false;
  loadTenantFacebook = false;
  loadTenantTwitter = false;
  loadTenantInsta = false;
  loadTenantBusinessEmailPassword = false;
  loadTenantLogo = false;
  loadTenantGst = false;

  tenantDetailId: number;
  tenantEmail: string;
  tenantBusinessEmail: string;
  tenantContact: string;
  tenantStreet: string;
  tenantCity: string;
  tenantPin: string;
  tenantFacebook: string;
  tenantTwitter: string;
  tenantInsta: string;
  tenantBusinessEmailPassword: string = "Dummy Text";
  tenantLogo: File = null;
  tenantGstIn: string;

  constructor(private tenantStore: TenantStoreService,
              private tenantService: TenantService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.tenantDetailId = this.tenantStore.tenantDetailId;
    this.tenantEmail = this.tenantStore.tenantEmail;
    this.tenantBusinessEmail = this.tenantStore.businessEmail;
    this.tenantContact = this.tenantStore.tenantContact;
    this.tenantStreet = this.tenantStore.tenantStreet;
    this.tenantCity = this.tenantStore.tenantCity;
    this.tenantPin = this.tenantStore.tenantPin;
    this.tenantFacebook = this.tenantStore.tenantFacebook;
    this.tenantTwitter = this.tenantStore.tenantTwitter;
    this.tenantInsta = this.tenantStore.tenantInsta;
    this.tenantGstIn = this.tenantStore.tenantGstIn;
  }

  updateTenantEmail(){
    this.loadTenantEmail = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', this.tenantEmail, '', '', '', '', '', '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantEmail = false;
                          this.loadTenantEmail = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  handleFileUpdate(files: FileList) {
    this.tenantLogo = files.item(0);
  }
  updateTenantLogo(){
    this.loadTenantLogo = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, this.tenantLogo, '', '', '', '', '', '', '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantLogo = false;
                          this.loadTenantLogo = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantBusinessEmail(){
    this.loadTenantBusinessEmail = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', this.tenantBusinessEmail, '', '', '', '', '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantBusinessEmail = false;
                          this.loadTenantBusinessEmail = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantBusinessEmailPassword(){
    this.loadTenantBusinessEmailPassword = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', this.tenantBusinessEmailPassword, '', '', '', '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantBusinessEmailPassword = false;
                          this.loadTenantBusinessEmailPassword = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantContact(){
    this.loadTenantContact = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', this.tenantContact, '', '', '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantContact = false;
                          this.loadTenantContact = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantStreet(){
    this.loadTenantStreet = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', this.tenantStreet, '', '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantStreet = false;
                          this.loadTenantStreet = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantCity(){
    this.loadTenantCity = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', this.tenantCity, '', '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantCity = false;
                          this.loadTenantCity = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantPin(){
    this.loadTenantPin = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', this.tenantPin, '', '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantPin = false;
                          this.loadTenantPin = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantFacebook(){
    this.loadTenantFacebook = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', this.tenantFacebook, '', '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantFacebook = false;
                          this.loadTenantFacebook = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantTwitter(){
    this.loadTenantTwitter = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', '', this.tenantTwitter, '', '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantFacebook = false;
                          this.loadTenantTwitter = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantInsta(){
    this.loadTenantInsta = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', '', '', this.tenantInsta, '')
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantInsta = false;
                          this.loadTenantInsta = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

  updateTenantGst(){
    this.loadTenantGst = true;
    this.tenantService.updateTenantDetails(this.tenantDetailId, '', '', '', '', '', '', '', '', '', '', '', this.tenantGstIn)
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.editTenantGst = false;
                          this.loadTenantGst = false;
                        }
                        else{
                          alert("error");
                        }
                      },
                      (error:any) => {
                        alert("error");
                      });
  }

}
