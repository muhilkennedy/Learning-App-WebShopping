import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeePermissionComponent } from './employee-permission/employee-permission.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employee'
    },
    children: [
      {
        path: '',
        redirectTo: 'employee'
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: {
          title: 'Manage Employee'
        }
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'Manage Customer'
        }
      },
      {
        path: 'OnboardEmployee',
        component: CreateEmployeeComponent,
        data: {
          title: 'Onboard Employee'
        }
      },
      {
        path: 'EmployeePermissions',
        component: EmployeePermissionComponent,
        data: {
          title: 'Employee Permissions'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
