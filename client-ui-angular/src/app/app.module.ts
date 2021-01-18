import { BrowserModule, Title } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material modules
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TenantStoreService } from './service/shared/tenant-store/tenant-store.service';
import { environment } from 'src/environments/environment';
import { InterceptorService } from './service/shared/interceptor/interceptor-service.service';
import { ContactComponent } from './components/contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AuthenticateComponent } from './components/shared/authenticate/authenticate.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrdersDialogComponent } from './components/order-history/orders-dialog/orders-dialog.component';
import { PosHistoryComponent } from './components/pos-history/pos-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PosDialogComponent } from './components/pos-history/pos-dialog/pos-dialog.component';
import { CommonsService } from './service/shared/commons/commons.service';
import { CollapseModule } from '../app/service/shared/collapse';
import { AlertModule } from './service/shared/_alert';
import {SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

const fbLoginOptions = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
};

const googleLoginOptions = {
  scope: 'profile email'
};

@Injectable()
export class TenantInitializer {

  constructor(private http: HttpClient, private tenantStore: TenantStoreService,
              private commonService: CommonsService) { }

  initializeApp(): Promise<any> {
    this.commonService.globalLoading = true;
    return new Promise((resolve, reject) => {
          console.log(`initializeApp:: Setting up Tenant`);
          this.http.get(environment.backendBaseUrl + '/base/ping')
              .subscribe(
                (resp:any) => {
                  this.tenantStore.tenantId = resp.data.tenantId;
                  this.tenantStore.tenantName = resp.data.tenantUniqueName;
                  this.tenantStore.tenantActive = resp.data.tenantActive;
                  this.tenantStore.publicKey = resp.data.publicKey;
                  //set tenant details
                  let tenantDetails = resp.dataList[0];
                  if(tenantDetails != null && tenantDetails !== undefined){
                    this.tenantStore.tenantDetailId = tenantDetails.tenantDetailId;
                    this.tenantStore.tenantEmail = tenantDetails.tenantEmail;
                    this.tenantStore.tenantFacebook = tenantDetails.tenantFacebook;
                    this.tenantStore.tenantInsta = tenantDetails.tenantInsta;
                    this.tenantStore.tenantTwitter = tenantDetails.tenantTwitter;
                    this.tenantStore.tenantStreet = tenantDetails.tenantStreet;
                    this.tenantStore.tenantCity = tenantDetails.tenantCity;
                    this.tenantStore.tenantPin = tenantDetails.tenantPin;
                    this.tenantStore.tenantContact = tenantDetails.tenantContact;
                    this.tenantStore.businessEmail = tenantDetails.businessEmail;
                    this.tenantStore.tenantGstIn = tenantDetails.gstIn;
                    this.tenantStore.tenantFssai = tenantDetails.fssai;
                    this.tenantStore.tenantTagLine = tenantDetails.tagLine;
                    this.tenantStore.tenantGmap = tenantDetails.gmapLocation;
                  }
                  this.tenantStore.tenantLogo = resp.dataList[1];
                  //load app only if tenant is active.
                  if(this.tenantStore.tenantActive){
                    this.commonService.globalLoading = false;
                     resolve(true);
                  }
                  else{
                    alert("Tenant not Active! Please contact support!")
                  }
                },
                (error:any) => {
                    console.log("error in loading tenant");
                    alert("Tenant Server not Reachable at the moment! Please try again later!");
                }
              );
    });
  }
}

export function init_tenant(initializer: TenantInitializer) {
  return () => initializer.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    ProductListComponent,
    NotFoundComponent,
    AuthenticateComponent,
    CartComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    OrdersDialogComponent,
    PosHistoryComponent,
    ProfileComponent,
    PosDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '4px',
      primaryColour: '#FE980F',
      secondaryColour: 'chocolate',
      tertiaryColour: 'darkred'
    }),
    NgbModule,
    SocialLoginModule,
    CollapseModule,
    AlertModule
  ],
  providers: [
    Title,
    TenantInitializer,
    {
      provide: APP_INITIALIZER,
      useFactory: init_tenant,
      multi: true,
      deps: [TenantInitializer]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '772727132288-2bv75lhs16rsohc5rg3pscui1ugl9jff.apps.googleusercontent.com', googleLoginOptions
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

