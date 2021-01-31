import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContactService } from 'src/app/service/contact/contact.service';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  loading = false;

  gmapUrl:any;
  view = false;

  from:string;
  name:string;
  subject:string;
  message:string;

  constructor(public tenantStore: TenantStoreService, private sanitizer: DomSanitizer,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.gmapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tenantStore.tenantGmap);
    this.view = true;
  }

  sendEmail(){
    this.loading = true;
    this.contactService.sendContactEmail(this.from, this.name, this.subject, this.message)
                        .subscribe((resp:any) => {
                          if(resp.statusCode !== 200){
                            alert("Error in sending email!")
                          }
                          this.loading = false;
                        },
                        (error: any) => {
                          alert("Something went wrong!");
                        })
  }

}
