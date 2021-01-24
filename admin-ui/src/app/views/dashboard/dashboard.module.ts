import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeModule } from '../employee/employee.module';
import { TodoComponent } from './components/todo/todo.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AlertModule } from '../../shared/_alert';
import { TaskModule } from '../task/task.module';
import { TenantDetailsComponent } from './components/tenant-details/tenant-details.component';
import { CollapseModule } from '../../shared/collapse';
import { SalesCountComponent } from './components/sales-count/sales-count.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,
    EmployeeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '4px',
      primaryColour: 'cornflowerblue',
      secondaryColour: 'chocolate',
      tertiaryColour: 'darkred'
    }),
    AlertModule,
    TaskModule,
    CollapseModule
  ],
  declarations: [
    DashboardComponent,
    TodoComponent,
    TenantDetailsComponent,
    SalesCountComponent
  ]
})
export class DashboardModule { }
