import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosComponent } from './pos.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Point Of Sale'
    },
    children: [
      {
        path: '',
        redirectTo: 'pos'
      },
      {
        path: 'pos',
        component: PosComponent,
        data: {
          title: 'Point Of Sale'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule {}
