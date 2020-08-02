import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CouponService } from '../../../shared/coupon/coupon.service';
import { AlertService } from '../../../shared/_alert';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {

  loading = false;

  minDateToBegin: Date;
  maxDateToBegin: Date;

  minDateToEnd: Date;
  maxDateToEnd: Date;
  EndDateActive = false;

  active=true;
  freeShipping = false;
  title:string;
  code:string;
  discount:number;
  userUsage:number
  startDate:Date;
  endDate:Date;

  constructor(private coupService: CouponService, private alertService: AlertService) {
    this.minDateToBegin = new Date();
  }

  ngOnInit(): void {
  }

  setStartDate(type: string, event: MatDatepickerInputEvent<Date>){
    this.startDate = event.value;

    this.minDateToEnd = event.value;
    this.EndDateActive = true;
  }

  setEndDate(type: string, event: MatDatepickerInputEvent<Date>){
    this.endDate = event.value;
  }

  toggleShipping(){
    this.freeShipping = !this.freeShipping;
  }

  createCoupon(){
    this.loading = true;
    this.coupService.createCoupon(this.title, this.code, this.startDate,
                    this.endDate, this.active, this.discount, this.freeShipping, this.userUsage)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.alertService.success('Coupon created successfully');
                        this.reset();
                      }
                      else{
                        this.alertService.warn('Error : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error:any)=>{
                      this.alertService.error('Something went wrong... try again later!');
                      this.loading = false;
                    });
  }

  reset(){
    this.freeShipping = false;
    this.title = '';
    this.code = '';
    this.discount = 0;
    this.userUsage = 0;
    this.endDate = null;
    this.startDate = null;
  }

}
