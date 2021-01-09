import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injectable  } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
import { ThermalPrintModule } from 'ng-thermal-print';

import { SharedModule } from './shared/shared.module';
import { AlertModule } from './shared/_alert/alert.module';
import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './component/login/login.component';
import { BarecodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { PdfViewerModule } from 'ng2-pdf-viewer';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { TenantStoreService } from './service/tenantStore/tenant-store.service';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PushNotificationComponent } from './containers/push-notification/push-notification.component';
import { ChatMessengerComponent } from './containers/chat-messenger/chat-messenger.component';
import { ScheduledTasksComponent } from './containers/scheduled-tasks/scheduled-tasks.component';


@Injectable()
export class TenantInitializer {

  constructor(private http: HttpClient, private tenantStore: TenantStoreService) { }

  initializeApp(): Promise<any> {
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
                  let tenantDetails = resp.dataList != null ? resp.dataList[0] : null;
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
                  }
                  this.tenantStore.tenantLogo = resp.dataList != null ? resp.dataList[1] : null;
                  //load app only if tenant is active.
                  if(this.tenantStore.tenantActive){
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
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '4px',
      primaryColour: 'cornflowerblue',
      secondaryColour: 'chocolate',
      tertiaryColour: 'darkred'
    }),
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    SharedModule,
    AlertModule,
    ModalModule,
    NgMultiSelectDropDownModule.forRoot(),
    ThermalPrintModule,
    BarecodeScannerLivestreamModule,
    PdfViewerModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    NotFoundComponent,
    PushNotificationComponent,
    ChatMessengerComponent,
    ScheduledTasksComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
    },
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
      multi: true },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
