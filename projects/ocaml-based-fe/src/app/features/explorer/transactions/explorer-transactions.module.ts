import { NgModule } from '@angular/core';

import { ExplorerTransactionsComponent } from './explorer-transactions.component';
import { ExplorerTransactionsTableComponent } from './explorer-transactions-table/explorer-transactions-table.component';
import { ExplorerTransactionsRouting } from '@ocfe-explorer/transactions/explorer-transactions.routing';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerTransactionsEffects } from '@ocfe-explorer/transactions/explorer-transactions.effects';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { ExplorerTransactionsNewComponent } from './explorer-transactions-new/explorer-transactions-new.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ExplorerTransactionsComponent,
    ExplorerTransactionsTableComponent,
    ExplorerTransactionsNewComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    MatDialogModule,
    ExplorerTransactionsRouting,
    EffectsModule.forFeature(ExplorerTransactionsEffects),
  ],
})
export class ExplorerTransactionsModule {}
