import { ErrorHandler, Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from '@fufe-app/app.routing';
import { AppComponent } from '@fufe-app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EagerSharedModule } from '@fufe-shared/eager-shared.module';
import { ToolbarComponent } from '@fufe-app/layout/toolbar/toolbar.component';
import { metaReducers, reducers } from '@fufe-app/app.setup';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from '@fufe-app/app.effects';
import { ErrorPreviewComponent } from '@fufe-error-preview/error-preview.component';
import { ErrorListComponent } from '@fufe-error-preview/error-list/error-list.component';
import { NgrxRouterStoreModule } from '@fufe-shared/router/ngrx-router.module';
import { CONFIG } from '@fufe-shared/constants/config';
import { GlobalErrorHandlerService } from '@fufe-core/services/global-error-handler.service';
import { SubmenuTabsComponent } from '@fufe-app/layout/submenu-tabs/submenu-tabs.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { THEME_PROVIDER } from '@openmina/shared';

@Injectable()
export class AppGlobalErrorhandler implements ErrorHandler {
  constructor(private errorHandlerService: GlobalErrorHandlerService) {}

  handleError(error: any) {
    this.errorHandlerService.handleError(error);
    console.error(error);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ErrorPreviewComponent,
    ErrorListComponent,
    SubmenuTabsComponent,
  ],
  imports: [
    BrowserModule,
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
    EffectsModule.forRoot(AppEffects),
    NgrxRouterStoreModule,
    !CONFIG.production ? StoreDevtoolsModule.instrument({ maxAge: 250 }) : [],
    HttpClientModule,
    BrowserAnimationsModule,
    EagerSharedModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    THEME_PROVIDER,
    { provide: ErrorHandler, useClass: AppGlobalErrorhandler, deps: [GlobalErrorHandlerService] },
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
