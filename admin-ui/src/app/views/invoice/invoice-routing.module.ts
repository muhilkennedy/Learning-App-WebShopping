import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceTemplateComponent } from './invoice-template.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Invoice Template'
    },
    children: [
      {
        path: '',
        redirectTo: 'invoice-template'
      },
      {
        path: 'invoice-template',
        component: InvoiceTemplateComponent,
        data: {
          title: 'Templates'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceTemplateRoutingModule {}
