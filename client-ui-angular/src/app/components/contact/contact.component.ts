import { Component, OnInit } from '@angular/core';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public tenantStore: TenantStoreService) { }

  ngOnInit(): void {
  }

}
