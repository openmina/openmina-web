import { NgModule } from '@angular/core';

import { StorageAccountsComponent } from './storage-accounts.component';
import { StorageAccountsRouting } from '@ocfe-storage/accounts/storage-accounts.routing';
import { StorageAccountsTableComponent } from './storage-accounts-table/storage-accounts-table.component';
import { StorageAccountsToolbarComponent } from './storage-accounts-toolbar/storage-accounts-toolbar.component';
import { StorageAccountsFilterComponent } from './storage-accounts-filter/storage-accounts-filter.component';
import { StorageAccountsSidePanelComponent } from './storage-accounts-side-panel/storage-accounts-side-panel.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StorageAccountsEffects } from '@ocfe-storage/accounts/storage-accounts.effects';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { CommonModule } from '@angular/common';
import { MinaJsonViewerComponent } from '@ocfe-shared/components/mina-json-viewer/mina-json-viewer.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';


@NgModule({
  declarations: [
    StorageAccountsComponent,
    StorageAccountsTableComponent,
    StorageAccountsToolbarComponent,
    StorageAccountsFilterComponent,
    StorageAccountsSidePanelComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    StorageAccountsRouting,
    EffectsModule.forFeature(StorageAccountsEffects),
    CopyComponent,
    MinaJsonViewerComponent,
    HorizontalResizableContainerComponent,
  ],
})
export class StorageAccountsModule {}
