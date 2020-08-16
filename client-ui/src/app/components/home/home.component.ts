import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { HomeService } from 'src/app/shared/service/home.service';
import { TenantStoreService } from 'src/app/service/tenantStore/tenant-store.service';
import { environment } from 'src/environments/environment';

declare var mainSlider: Function;
declare var rerun: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  loading = false;
  wait = true;
  initialRequest = true;

  homeMedia:any = new Array();
  homeSlider:any = new Array();

  //dummy variable to iterate for home media images.
  images:any = new Array();
  shouldShow = false;
  show(media:any): boolean{
    if(media === undefined || media === null){
      return false;
    }
    else{
      return true;
    }
  }

   constructor(private homeService: HomeService, public tenantStore: TenantStoreService) {
    this.images = new Array(this.tenantStore.tenantHomeMediaLength);
    this.loading = true;
    this.homeService.getAllHomeMedia()
            .subscribe((resp:any) => {
              this.loading = false;
              resp.dataList.forEach(item => {
                if(item.sliderShow){
                  this.homeSlider.push(item);
                }
                else{
                  this.homeMedia.push(item);
                }
              });
              this.images = new Array(this.homeMedia.length);
              this.shouldShow = true;
              // rerun the main.js script to load the styles.
              rerun();
            },
            (error) => {
              alert("loading data failed");
            });
   }

  ngOnInit(): void {
    console.log("init");
    // mainSlider();
  }

  getBool(value): Boolean{
    if(value === true){
      return true;
    }
    else{
      return false;
    }
  }

  showMedia(){
    if(this.homeMedia === undefined || this.homeMedia === null){
      return false;
    }
    else{
      return true;
    }
  }

}
