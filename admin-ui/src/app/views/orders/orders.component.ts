import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/_alert';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
declare var rsaencrypt: Function;

@Component({
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss']
})
export class OrdersComponent implements OnInit {

  loading = false;
  passwordLoading = false;
  alertoptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  ngOnInit(): void {

  }

}
