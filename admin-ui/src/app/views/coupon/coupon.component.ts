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
    this.getCoupons();
  }

  getCoupons(){
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

  toggleCouponStatus(coupon){
    this.loading = true;
    this.coupService.toggleCouponStatus(coupon.couponId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.getCoupons();
                      }
                      else{
                        this.alertService.error("Failed to update status!");
                      }
                    },
                    (error) => {
                      this.alertService.error('Something went wrong... try again later!');
                    });
  }

  deleteCoupon(coupon){
    this.coupService.deleteCoupon(coupon.couponId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.getCoupons();
                      }
                      else{
                        this.alertService.error("Failed to delete Coupon!");
                      }
                    },
                    (error) => {
                      this.alertService.error('Something went wrong... try again later!');
                    });
  }
}
