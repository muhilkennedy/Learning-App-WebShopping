import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales'
    },
    children: [
      {
        path: '',
        redirectTo: 'orders'
      },
      {
        path: 'orders',
        data: {
          title: 'orders'
        }
      },
      {
        path: 'approval',
        data: {
          title: 'Approve Orders'
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: 'Transactions'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
