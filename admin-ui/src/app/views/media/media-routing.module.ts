import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Media'
    },
    children: [
      {
        path: '',
        redirectTo: 'media'
      },
      {
        path: 'media',
        component: MediaComponent,
        data: {
          title: 'Manage Media'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {}
