import { Component, OnInit } from '@angular/core';
import { TenantStoreService } from 'src/app/service/shared/tenant-store/tenant-store.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public tenantStore: TenantStoreService) { }

  ngOnInit(): void {
  }

}
