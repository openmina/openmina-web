import { ErrorHandler, Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  GlobalErrorHandlerService,
  HorizontalMenuComponent,
  NgrxRouterStoreModule,
  OpenminaEagerSharedModule,
  THEME_PROVIDER
} from '@openmina/shared';
import * as Sentry from '@sentry/angular-ivy';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { MenuComponent } from '@rufe-app/layout/menu/menu.component';
import { ToolbarComponent } from '@rufe-app/layout/toolbar/toolbar.component';
import { ErrorPreviewComponent } from '@rufe-error-preview/error-preview.component';
import { ErrorListComponent } from '@rufe-error-preview/error-list/error-list.component';
import { ServerStatusComponent } from '@rufe-app/layout/server-status/server-status.component';
import { SubmenuTabsComponent } from '@rufe-app/layout/submenu-tabs/submenu-tabs.component';
import { NodePickerComponent } from '@rufe-app/layout/node-picker/node-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CONFIG } from '@rufe-shared/constants/config';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '@rufe-app/app.setup';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '@rufe-app/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEn, 'en');

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
    THEME_PROVIDER,
    { provide: ErrorHandler, useClass: AppGlobalErrorhandler, deps: [GlobalErrorHandlerService] },
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
