import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/_alert';
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

  constructor(private deliveryService:DeliveryService, private alertService: AlertService){
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
                            this.alertService.error("Failed : " + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("Something went wrong! Try again later!");
                        })
  }

  createPincodeConfig(){
    this.loading = true;
    if(this.pincode === undefined || this.pincode === null || this.pincode === ''){
      this.alertService.warn("Pincode is Mandatory");
      this.loading = false;
      return;
    }
    this.deliveryService.createConfig(this.pincode, this.deliveryCharge,
      this.minimumChargeForFreeDelivery, this.fromTime, this.tillTime, this.minimumDeliveryInHours)
                        .subscribe((resp: any) => {
                          if(resp.statusCode === 200){
                            this.getAllPinConfigs();
                          }
                          else{
                            this.alertService.error("Failed : " + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("Something went wrong! Try again later!");
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
                            this.alertService.error("Failed : " + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("Something went wrong! Try again later!");
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
                            this.alertService.error("Failed : " + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("Something went wrong! Try again later!");
                        })
  }

}
