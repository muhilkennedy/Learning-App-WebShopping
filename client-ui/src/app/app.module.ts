import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { ContactComponent } from './components/contact/contact.component';

import { SharedModule } from './shared/shared.module';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TenantStoreService } from './service/tenantStore/tenant-store.service';
import { environment } from 'src/environments/environment';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';

@Injectable()
export class TenantInitializer {

  constructor(private http: HttpClient, private tenantStore: TenantStoreService) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
          console.log(`initializeApp:: Setting up Tenant`);
          this.http.get(environment.backendBaseUrl + '/base/ping')
              .subscribe(
                (resp:any) => {
                  console.log(resp.data);
                  this.tenantStore.tenantId = resp.data.tenantId;
                  this.tenantStore.tenantName = resp.data.tenantUniqueName;
                  this.tenantStore.tenantActive = resp.data.tenantActive;
                  this.tenantStore.publicKey = resp.data.publicKey;

                  let tenantDetails = resp.dataList[0];
                  this.tenantStore.tenantContact = tenantDetails.tenantContact;
                  this.tenantStore.tenantEmail = tenantDetails.tenantEmail;
                  this.tenantStore.tenantStreet = tenantDetails.tenantStreet;
                  this.tenantStore.tenantPin = tenantDetails.tenantPin;
                  this.tenantStore.tenantCity = tenantDetails.tenantCity;
                  this.tenantStore.tenantFacebook = tenantDetails.tenantFacebook;
                  this.tenantStore.tenantInsta = tenantDetails.tenantInsta;
                  this.tenantStore.tenantTwitter = tenantDetails.tenantTwitter;

                  this.tenantStore.tenantHomeMediaLength = resp.dataList[1];
                  if(this.tenantStore.tenantActive){
                    resolve();
                  }
                },
                (error:any) => {
                  alert("failure resp" + error)
                    console.log("error in loading tenant");
                }
              );
          // load app only if tenant is active.
          // setTimeout(() => {
          //   console.log("trying to resolve requst....");
          //   if(this.tenantStore.tenantActive === true){
          //     console.log("Loading comeplete!");
          //     resolve();
          //   }
          // }, 1000);
          // resolve();
    });
  }
}

export function init_tenant(initializer: TenantInitializer) {
  return () => initializer.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturedComponent,
    ContactComponent,
    HomePageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
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
      animationType: ngxLoadingAnimationTypes.chasingDots,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: 'brown',
      secondaryColour: 'brown',
      tertiaryColour: 'brown'
    }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(ref => {
      // Ensure Angular destroys itself on hot reloads.
      if (window['ngRef']) {
        window['ngRef'].destroy();
      }
      window['ngRef'] = ref;

      // Otherwise, log the boot error
    })
    .catch(err => console.error(err));
