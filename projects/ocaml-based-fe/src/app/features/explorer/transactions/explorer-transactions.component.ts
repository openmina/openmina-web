import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { selectActiveNode, selectAppNodeStatus } from '@ocfe-app/app.state';
import { filter, skip, timer } from 'rxjs';
import { ExplorerTransactionsClose, ExplorerTransactionsGetTransactions } from '@ocfe-explorer/transactions/explorer-transactions.actions';
import { NodeStatus } from '@ocfe-shared/types/app/node-status.type';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
    selector: 'mina-explorer-transactions',
    templateUrl: './explorer-transactions.component.html',
    styleUrls: ['./explorer-transactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExplorerTransactionsComponent extends StoreDispatcher implements OnInit, OnDestroy {

  private blockLevel: number;

  ngOnInit(): void {
    this.listenToActiveNodeAndBlockChange();
  }

  private listenToActiveNodeAndBlockChange(): void {
    this.select(selectActiveNode, () => {
      this.getTxs();
    }, filter(Boolean), skip(1));

    timer(5000, 5000)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getTxs();
      });

    this.select(selectAppNodeStatus, (status: NodeStatus) => {
      this.blockLevel = status.blockLevel;
      this.getTxs();
    }, filter(Boolean), filter(status => status.blockLevel !== this.blockLevel));
  }

  private getTxs(): void {
    this.dispatch(ExplorerTransactionsGetTransactions);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(ExplorerTransactionsClose);
  }
}
