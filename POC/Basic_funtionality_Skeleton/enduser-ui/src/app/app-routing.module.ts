import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FeaturedComponent } from './component/featured/featured.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'featured',
    component: FeaturedComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
    {
      enableTracing: true // <-- debugging purposes only
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
