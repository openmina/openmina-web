import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ManualDetection } from '@openmina/shared';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { WebNodeTransaction } from '@ocfe-shared/types/web-node/wallet/web-node-transaction.type';
import { selectWebNodeActiveTransaction } from '@ocfe-web-node/web-node-wallet/web-node-wallet.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WEB_NODE_WALLET_SELECT_TRANSACTION, WebNodeWalletSelectTransaction } from '@ocfe-web-node/web-node-wallet/web-node-wallet.actions';

@UntilDestroy()
@Component({
    selector: 'mina-web-node-wallet-side-panel',
    templateUrl: './web-node-wallet-side-panel.component.html',
    styleUrls: ['./web-node-wallet-side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column border-left' },
    standalone: false
})
export class WebNodeWalletSidePanelComponent extends ManualDetection implements OnInit {

  transaction: WebNodeTransaction;

  constructor(private store: Store<MinaState>) { super(); }

  ngOnInit(): void {
    this.store.select(selectWebNodeActiveTransaction)
      .pipe(untilDestroyed(this))
      .subscribe((activeTransaction: WebNodeTransaction) => {
        this.transaction = activeTransaction;
        this.detect();
      });
  }

  closeSidePanel(): void {
    // this.router.navigate([Routes.WEB_NODE, Routes.LOGS], { queryParamsHandling: 'merge' });
    this.store.dispatch<WebNodeWalletSelectTransaction>({ type: WEB_NODE_WALLET_SELECT_TRANSACTION, payload: undefined });
  }

}
