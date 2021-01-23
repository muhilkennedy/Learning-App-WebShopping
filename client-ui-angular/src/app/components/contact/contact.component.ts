import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  gmapUrl:any;
  view = false;

  constructor(public tenantStore: TenantStoreService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.gmapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tenantStore.tenantGmap);
    this.view = true;
  }

}
