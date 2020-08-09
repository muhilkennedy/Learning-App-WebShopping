import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tasks'
    },
    children: [
      {
        path: '',
        redirectTo: 'task'
      },
      {
        path: 'task/:isTaskpage',
        component: TaskComponent,
        data: {
          title: 'Manage Tasks'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
