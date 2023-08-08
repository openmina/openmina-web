import { NgModule } from '@angular/core';

import { WebNodeWalletComponent } from './web-node-wallet.component';
import { WebNodeWalletCreateWalletComponent } from './web-node-wallet-create-wallet/web-node-wallet-create-wallet.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { WebNodeWalletRouting } from '@ocfe-web-node/web-node-wallet/web-node-wallet.routing';
import { EffectsModule } from '@ngrx/effects';
import { WebNodeWalletEffects } from '@ocfe-web-node/web-node-wallet/web-node-wallet.effects';
import { WebNodeWalletTransactionsComponent } from './web-node-wallet-transactions/web-node-wallet-transactions.component';
import { WebNodeWalletCreateTransactionComponent } from './web-node-wallet-create-transaction/web-node-wallet-create-transaction.component';
import { WebNodeWalletToolbarComponent } from './web-node-wallet-toolbar/web-node-wallet-toolbar.component';
import { WebNodeWalletSidePanelComponent } from './web-node-wallet-side-panel/web-node-wallet-side-panel.component';
import { StepperComponent } from '@ocfe-shared/components/stepper/stepper.component';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';


@NgModule({
  declarations: [
    WebNodeWalletComponent,
    WebNodeWalletCreateWalletComponent,
    WebNodeWalletTransactionsComponent,
    WebNodeWalletCreateTransactionComponent,
    WebNodeWalletToolbarComponent,
    WebNodeWalletSidePanelComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    StepperComponent,
    WebNodeWalletRouting,
    EffectsModule.forFeature([WebNodeWalletEffects]),
  ],
  exports: [
    WebNodeWalletComponent,
  ],
})
export class WebNodeWalletModule {}
