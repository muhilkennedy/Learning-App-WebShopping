import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ContactService } from 'src/app/service/contact/contact.service';
import { CommonsService } from 'src/app/service/shared/commons/commons.service';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  loading = false;

  gmapUrl:any = null;
  view = false;

  from:string;
  name:string;
  subject:string;
  message:string;

  constructor(public tenantStore: TenantStoreService, private sanitizer: DomSanitizer,
              private contactService: ContactService, private _snackBar: MatSnackBar,
              private commonService: CommonsService) { }

  ngOnInit(): void {
    this.gmapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tenantStore.tenantGmap);
    this.view = true;
  }

  sendEmail(){
    this.loading = true;
    this.contactService.sendContactEmail(this.from, this.name, this.subject, this.message)
                        .subscribe((resp:any) => {
                          if(resp.statusCode !== 200){
                            this._snackBar.open('Failed to send Email... Try again!', 'OK', this.commonService.alertoptionsError);
                          }
                          this.loading = false;
                        },
                        (error: any) => {
                          this._snackBar.open('Something went wrong!', 'OK', this.commonService.alertoptionsError);
                        })
  }

  canShowMap(){
    if(this.tenantStore.tenantGmap !== null && this.tenantStore.tenantGmap !== undefined){
      return true;
    }
    else{
      return false;
    }
  }

}
