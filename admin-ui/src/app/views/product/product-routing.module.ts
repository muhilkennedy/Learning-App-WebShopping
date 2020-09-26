import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ManageProductComponent } from './manage-products/manage-product/manage-product.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products'
    },
    children: [
      {
        path: '',
        redirectTo: 'product-list'
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Manage Category'
        }
      },
      {
        path: 'product-list',
        component: ProductListComponent,
        data: {
          title: 'Products List'
        }
      },
      {
        path: 'manage-product',
        component: ManageProductComponent,
        data: {
          title: 'Products Management'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
