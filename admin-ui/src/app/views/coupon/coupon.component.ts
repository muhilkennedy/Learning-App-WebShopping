import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../shared/coupon/coupon.service';
import { AlertService } from '../../shared/_alert';

@Component({
  templateUrl: 'coupon.component.html'
})
export class CouponComponent implements OnInit {

  allCoupons:any[];
  loading = false;

  constructor(private coupService: CouponService, private alertService: AlertService) {

  }

  showTable(){
    if(this.allCoupons != undefined && this.allCoupons != null && this.allCoupons.length>0)
    {
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.coupService.getAllCoupons()
                    .subscribe((resp:any) => {
                      this.allCoupons = resp.dataList;
                      this.loading = false;
                    },
                    (error) => {
                      this.alertService.error('Something went wrong... try again later!');
                    });
  }
}
