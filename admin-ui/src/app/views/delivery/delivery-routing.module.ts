import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Delivery'
    },
    children: [
      {
        path: '',
        redirectTo: 'delivery'
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        data: {
          title: 'Delivery Configuration'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule {}
