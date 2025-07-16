import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { ExplorerBlock } from '@ocfe-shared/types/explorer/blocks/explorer-block.type';
import {
  selectExplorerBlocksActiveBlock,
  selectExplorerBlocksActiveZkApp,
  selectExplorerBlocksTxsAndZkApps
} from '@ocfe-explorer/blocks/explorer-blocks.state';
import { ExplorerBlockTx } from '@ocfe-shared/types/explorer/blocks/explorer-block-tx.type';
import { ExplorerBlocksSetActiveBlock } from '@ocfe-explorer/blocks/explorer-blocks.actions';
import { Router } from '@angular/router';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { ExplorerBlockZkApp } from '@ocfe-shared/types/explorer/blocks/explorer-block-zk-app-type';
import { getMergedRoute, MergedRoute } from '@openmina/shared';
import { take } from 'rxjs';

@Component({
    selector: 'mina-explorer-blocks-side-panel',
    templateUrl: './explorer-blocks-side-panel.component.html',
    styleUrls: ['./explorer-blocks-side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column h-100' },
    standalone: false
})
export class ExplorerBlocksSidePanelComponent extends StoreDispatcher implements OnInit {

  block: ExplorerBlock;
  txs: ExplorerBlockTx[];
  zkApps: ExplorerBlockZkApp[];
  activeZkApp: ExplorerBlockZkApp;
  selectedTabIndex: number;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    this.listenToRouteChange();
    this.listenToBlockChange();
    this.listenToTxsChange();
    this.listenToActiveZkAppChange();
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      this.selectedTabIndex = Number(route.queryParams['tab']) || 0;
    }, take(1));
  }

  private listenToBlockChange(): void {
    this.select(selectExplorerBlocksActiveBlock, (block: ExplorerBlock) => {
      this.block = block;
      this.detect();
    });
  }

  private listenToTxsChange(): void {
    this.select(selectExplorerBlocksTxsAndZkApps, ([txs, zkApps]: [ExplorerBlockTx[], ExplorerBlockZkApp[]]) => {
      this.txs = txs;
      this.zkApps = zkApps;
      this.detect();
    });
  }

  private listenToActiveZkAppChange(): void {
    this.select(selectExplorerBlocksActiveZkApp, (zkApp: ExplorerBlockZkApp) => {
      this.activeZkApp = zkApp;
      this.detect();
    });
  }

  closeSidePanel(): void {
    this.dispatch(ExplorerBlocksSetActiveBlock, undefined);
    this.router.navigate([Routes.EXPLORER, Routes.BLOCKS], { queryParamsHandling: 'preserve' });
  }

  selectTab(number: number): void {
    this.selectedTabIndex = number;
    this.router.navigate([Routes.EXPLORER, Routes.BLOCKS, this.block.hash], {
      queryParams: {
        tab: number,
      },
      queryParamsHandling: 'merge',
    });
  }
}
