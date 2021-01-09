import { Component, OnInit } from '@angular/core';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  orgName1:string;
  orgName2:string;

  constructor(public tenantStore: TenantStoreService) { }

  ngOnInit(): void {
    this.orgName1 = environment.orgName1;
    this.orgName2 = environment.orgName2;
  }

}
