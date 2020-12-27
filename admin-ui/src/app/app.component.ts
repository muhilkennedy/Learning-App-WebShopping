import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TenantStoreService } from './service/tenantStore/tenant-store.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  appIcon: HTMLLinkElement = document.querySelector("#appIcon");

  constructor(private router: Router, private tenantStore: TenantStoreService) { }

  ngOnInit() {
    this.appIcon.href = this.tenantStore.tenantLogo;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
