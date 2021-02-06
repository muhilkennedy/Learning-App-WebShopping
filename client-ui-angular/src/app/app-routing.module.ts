import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { PosHistoryComponent } from './components/pos-history/pos-history.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticateComponent } from './components/shared/authenticate/authenticate.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/shared/privacy-policy/privacy-policy.component';

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
    path:'authenticate',
    component: AuthenticateComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'productList',
    component: ProductListComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  },
  {
    path:'orders',
    component: OrderHistoryComponent
  },
  {
    path:'posOrders',
    component: PosHistoryComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'privacy',
    component: PrivacyPolicyComponent
  },
  {
    path:'productDetail',
    component: ProductDetailsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
