import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/_alert';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
import { DeliveryService } from '../../shared/delivery/delivery.service';
declare var rsaencrypt: Function;

@Component({
  templateUrl: 'delivery.component.html',
  styleUrls: ['delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  loading = false;
  pincodedetails:any[] = new Array();

  isCardCollapsed: boolean = true;

  pincode: string;
  fromTime:any;
  tillTime:any;
  deliveryCharge: number;
  minimumChargeForFreeDelivery:number;
  minimumDeliveryInHours: number;

  ngOnInit(): void {

  }

  constructor(private deliveryService:DeliveryService){
    this.getAllPinConfigs();
  }

  getAllPinConfigs(){
    this.loading = true;
    this.deliveryService.getAllPinsConfig()
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            this.pincodedetails.length = 0;
                            this.pincodedetails = resp.dataList;
                          }
                          else{
                            alert('failed');
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          alert("Failed")
                        })
  }

  createPincodeConfig(){
    this.loading = true;
    this.deliveryService.createConfig(this.pincode, this.deliveryCharge,
      this.minimumChargeForFreeDelivery, this.fromTime, this.tillTime, this.minimumDeliveryInHours)
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            this.getAllPinConfigs();
                          }
                          else{
                            alert('failed');
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          alert("Failed")
                        })
  }

  togglePinConfig(pincode){
    this.loading = true;
    this.deliveryService.togglePinConfigStatus(pincode)
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            this.getAllPinConfigs();
                          }
                          else{
                            alert('failed');
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          alert("Failed")
                        })
  }

  deletePinConfig(pincode){
    this.loading = true;
    this.deliveryService.deletePinConfig(pincode)
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            this.getAllPinConfigs();
                          }
                          else{
                            alert('failed');
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          alert("Failed")
                        })
  }

}
