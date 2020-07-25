import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../shared/coupon/coupon.service';

@Component({
  templateUrl: 'coupon.component.html'
})
export class CouponComponent implements OnInit {

  allCoupons:any[];

  constructor(private coupService: CouponService) {

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
    this.coupService.getAllCoupons()
                    .subscribe((resp:any) => {
                      this.allCoupons = resp.dataList;
                    },
                    (error) => {
                      alert("failed to fetch coupons");
                    });
  }
}
