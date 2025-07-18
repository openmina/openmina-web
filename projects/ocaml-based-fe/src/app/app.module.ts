import { APP_INITIALIZER, ErrorHandler, Injectable, LOCALE_ID, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {
  GlobalErrorHandlerService,
  NgrxRouterStoreModule,
  OpenminaEagerSharedModule,
  THEME_PROVIDER,
  HorizontalMenuComponent
} from '@openmina/shared';
import { MenuComponent } from './layout/menu/menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { metaReducers, reducers } from '@ocfe-app/app.setup';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from '@ocfe-app/app.effects';
import { ErrorPreviewComponent } from '@ocfe-error-preview/error-preview.component';
import { ErrorListComponent } from '@ocfe-error-preview/error-list/error-list.component';
import * as Sentry from '@sentry/angular-ivy';
import { ServerStatusComponent } from './layout/server-status/server-status.component';
import { CONFIG } from '@ocfe-shared/constants/config';
import { SubmenuTabsComponent } from './layout/submenu-tabs/submenu-tabs.component';
import { NodePickerComponent } from './layout/node-picker/node-picker.component';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { MatSidenavModule } from '@angular/material/sidenav';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEn, 'en');

export const SENTRY_PROVIDER: Provider = {
  provide: ErrorHandler,
  useValue: Sentry.createErrorHandler(),
};

@Injectable()
export class AppGlobalErrorhandler implements ErrorHandler {
  constructor(private errorHandlerService: GlobalErrorHandlerService) {}

  handleError(error: any) {
    Sentry.captureException(error);
    this.errorHandlerService.handleError(error);
    console.error(error);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    ErrorPreviewComponent,
    ErrorListComponent,
    ServerStatusComponent,
    SubmenuTabsComponent,
    NodePickerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    CONFIG.firebase ? AngularFireModule.initializeApp(CONFIG.firebase) : [],
    CONFIG.firebase ? AngularFireAnalyticsModule : [],
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionWithinNgZone: true,
        strictStateSerializability: true,
      },
    }),
    EffectsModule.forRoot([AppEffects]),
    NgrxRouterStoreModule,
    !CONFIG.production ? StoreDevtoolsModule.instrument({ maxAge: 150 , connectInZone: true}) : [],
    HttpClientModule,
    MatSidenavModule,
    OpenminaEagerSharedModule,
    HorizontalMenuComponent,
  ],
  providers: [
    SENTRY_PROVIDER,
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    THEME_PROVIDER,
    { provide: ErrorHandler, useClass: AppGlobalErrorhandler, deps: [GlobalErrorHandlerService] },
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

