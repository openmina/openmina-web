import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getMergedRoute, MergedRoute, TableColumnList } from '@openmina/shared';
import { ExplorerBlock } from '@ocfe-shared/types/explorer/blocks/explorer-block.type';
import {
  selectExplorerBlocks,
  selectExplorerBlocksActiveBlock,
  selectExplorerBlocksSorting
} from '@ocfe-explorer/blocks/explorer-blocks.state';
import { ExplorerBlocksSetActiveBlock, ExplorerBlocksSort } from '@ocfe-explorer/blocks/explorer-blocks.actions';
import { Router } from '@angular/router';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { filter, take } from 'rxjs';
import { MinaTableOcamlWrapper } from '@ocfe-shared/base-classes/mina-table-ocaml-wrapper.class';

@Component({
    selector: 'mina-explorer-blocks-table',
    templateUrl: './explorer-blocks-table.component.html',
    styleUrls: ['./explorer-blocks-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column h-100' },
    standalone: false
})
export class ExplorerBlocksTableComponent extends MinaTableOcamlWrapper<ExplorerBlock> implements OnInit {

  protected readonly tableHeads: TableColumnList<ExplorerBlock> = [
    { name: 'date', sort: 'timestamp' },
    { name: 'hash' },
    { name: 'height' },
    { name: 'global slot', sort: 'globalSlot' },
    { name: 'user commands', sort: 'txCount' },
    { name: 'zk apps', sort: 'zkAppsCount' },
    {
      name: 'total transactions',
      sort: 'totalTxCount',
      tooltip: 'User commands + Fee transfers + ZkApp commands + 1 coinbase'
    },
    { name: 'snark jobs', sort: 'snarkCount' },
    { name: 'staged ledger hash', sort: 'stagedLedgerHash' },
    { name: 'snarked ledger hash', sort: 'snarkedLedgerHash' },
  ];

  private activeBlock: ExplorerBlock;
  private hashFromRoute: string;

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToRouteChange();
    this.listenToBlocks();
    this.listenToActiveTraceChange();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [175, 140, 95, 100, 135, 115, 170, 115, 160, 163];
    this.table.sortClz = ExplorerBlocksSort;
    this.table.sortSelector = selectExplorerBlocksSorting;
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      if (route.params['hash'] && this.table.rows.length === 0) {
        this.hashFromRoute = route.params['hash'];
      }
    }, take(1));
  }

  private listenToBlocks(): void {
    this.select(selectExplorerBlocks, (blocks: ExplorerBlock[]) => {
      this.table.rows = blocks;
      this.table.detect();
      if (this.hashFromRoute) {
        this.scrollToElement();
      }
    }, filter(blocks => blocks.length > 0));
  }

  private listenToActiveTraceChange(): void {
    this.select(selectExplorerBlocksActiveBlock, (activeBlock: ExplorerBlock) => {
      this.activeBlock = activeBlock;
      this.table.activeRow = activeBlock;
      this.table.detect();
    }, filter(trace => trace !== this.activeBlock));
  }

  private scrollToElement(): void {
    const finder = (block: ExplorerBlock) => block.hash === this.hashFromRoute;
    const i = this.table.rows.findIndex(finder);
    this.table.scrollToElement(finder);
    delete this.hashFromRoute;
    this.onRowClick(this.table.rows[i], true);
  }

  goToScanState(height: number): void {
    this.router.navigate([Routes.EXPLORER, Routes.SCAN_STATE, height], { queryParamsHandling: 'preserve' });
  }

  protected override onRowClick(block: ExplorerBlock, skipZkApp: boolean = false): void {
    if (this.activeBlock?.hash !== block?.hash) {
      this.router.navigate([Routes.EXPLORER, Routes.BLOCKS, block.hash], {
        queryParams: skipZkApp ? undefined : {
          activeZkApp: null,
        },
        queryParamsHandling: 'merge',
      });
      this.dispatch(ExplorerBlocksSetActiveBlock, block);
    }
  }
}
