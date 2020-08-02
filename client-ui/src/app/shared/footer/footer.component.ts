import { Component, OnInit } from '@angular/core';
import { TenantStoreService } from 'src/app/service/tenantStore/tenant-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  tagLine = environment.tagLine;

  constructor(public tenantStore: TenantStoreService) { }

  ngOnInit(): void {
  }

}
