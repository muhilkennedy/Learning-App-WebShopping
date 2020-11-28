import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineTransactionsComponent } from './online-transactions/online-transactions.component';
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
        component: OnlineTransactionsComponent,
        data: {
          title: 'Online Transactions'
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: 'POC Transactions'
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
