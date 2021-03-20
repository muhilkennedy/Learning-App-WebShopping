import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  primaryContact: string;
  secondaryContact: string;

  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  isMobileView(){
    if(this.innerWidth < 600){
      return true;
    }
    else{
      return false;
    }
  }

  constructor(public tenantStore: TenantStoreService, private router: Router) { }

  ngOnInit(): void {
    this.onResize("event");
    this.orgName1 = environment.orgName1;
    this.orgName2 = environment.orgName2;
    this.primaryContact = environment.primaryContact;
    this.secondaryContact = environment.secondaryContact;
  }

  openPrivacyPolicy(){
    this.router.navigate(['/privacy']);
  }

}
