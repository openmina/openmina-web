import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BenchmarksWallet } from '@ocfe-shared/types/benchmarks/wallets/benchmarks-wallet.type';
import { filter, skip } from 'rxjs';
import { selectActiveNode, selectAppNodeStatus } from '@ocfe-app/app.state';
import { BenchmarksWalletsGetWallets } from '@ocfe-benchmarks/wallets/benchmarks-wallets.actions';
import { NodeStatus } from '@ocfe-shared/types/app/node-status.type';
import { selectBenchmarksWallets } from '@ocfe-benchmarks/wallets/benchmarks-wallets.state';
import { TableColumnList } from '@ocfe-shared/types/shared/table-head-sorting.type';
import { MinaTableWrapper } from '@ocfe-shared/base-classes/mina-table-wrapper.class';

@Component({
  selector: 'mina-benchmarks-wallets-table',
  templateUrl: './benchmarks-wallets-table.component.html',
  styleUrls: ['./benchmarks-wallets-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column h-100' },
})
export class BenchmarksWalletsTableComponent extends MinaTableWrapper<BenchmarksWallet> implements OnInit {

  protected readonly tableHeads: TableColumnList<BenchmarksWallet> = [
    { name: 'public key' },
    { name: 'balance' },
    { name: 'nonce' },
    { name: 'pool nonce' },
    { name: 'last tx. time' },
    { name: 'last tx. memo' },
    { name: 'last tx. status' },
    { name: 'txs. ratio' },
  ];

  private blockLevel: number;

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToActiveNodeChange();
    this.listenToWalletChanges();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [220, 170, 100, 105, 170, 140, 125, 160];
  }

  private listenToActiveNodeChange(): void {
    this.select(selectActiveNode, () => {
      this.dispatch(BenchmarksWalletsGetWallets);
    }, filter(Boolean), skip(1));

    this.select(selectAppNodeStatus, (status: NodeStatus) => {
      this.blockLevel = status.blockLevel;
      this.dispatch(BenchmarksWalletsGetWallets);
    }, filter(Boolean), filter(status => status.blockLevel !== this.blockLevel));
  }

  private listenToWalletChanges(): void {
    this.select(selectBenchmarksWallets, (wallets: BenchmarksWallet[]) => {
      this.table.rows = wallets;
      this.table.detect();
    }, filter(wallets => wallets.length > 0));
  }
}

