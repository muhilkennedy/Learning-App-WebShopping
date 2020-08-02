import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Profile'
    },
    children: [
      {
        path: '',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Manage Profile'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
