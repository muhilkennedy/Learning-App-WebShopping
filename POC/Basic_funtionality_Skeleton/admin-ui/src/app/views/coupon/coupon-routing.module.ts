import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponComponent } from './coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Coupons'
    },
    children: [
      {
        path: '',
        redirectTo: 'coupon'
      },
      {
        path: 'coupon',
        component: CouponComponent,
        data: {
          title: 'Manage Coupon'
        }
      },
      {
        path: 'createCoupon',
        component: CreateCouponComponent,
        data: {
          title: 'Create Coupon'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule {}
