import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  getMergedRoute,
  hasValue,
  MergedRoute,
  SEC_CONFIG_GRAY_PALETTE,
  SecDurationConfig,
  TableColumnList
} from '@openmina/shared';
import { Router } from '@angular/router';
import {
  DswBootstrapSetActiveBlock,
  DswBootstrapSortNodes,
  DswBootstrapToggleSidePanel
} from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.actions';
import {
  selectDswBootstrapActiveNode,
  selectDswBootstrapNodes,
  selectDswBootstrapOpenSidePanel,
  selectDswBootstrapSort,
} from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.state';
import { delay, filter, mergeMap, of, take } from 'rxjs';
import { Routes } from '@rufe-shared/enums/routes.enum';
import { DswBootstrapNode } from '@rufe-shared/types/nodes/bootstrap/dsw-bootstrap-node.type';
import { MinaTableRustWrapper } from '@rufe-shared/base-classes/mina-table-rust-wrapper.class';

@Component({
  selector: 'mina-dsw-bootstrap-table',
  templateUrl: './dsw-bootstrap-table.component.html',
  styleUrls: ['./dsw-bootstrap-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswBootstrapTableComponent extends MinaTableRustWrapper<DswBootstrapNode> implements OnInit {

  readonly secConfig: SecDurationConfig = {
    color: true,
    onlySeconds: false,
    colors: SEC_CONFIG_GRAY_PALETTE,
    severe: 10,
    warn: 1,
    default: 0.01
  };

  openSidePanel: boolean = true;

  protected readonly tableHeads: TableColumnList<DswBootstrapNode> = [
    { name: '#', sort: 'index' },
    { name: 'global slot', sort: 'globalSlot', tooltip: 'The block’s slot irrespective of Mina epochs.' },
    { name: 'height', tooltip: 'The block height.' },
    { name: 'best tip', sort: 'bestTip', tooltip: 'Best tip to which node tried to synchronize.' },
    { name: 'amount', sort: 'fetchedBlocks', tooltip: 'Total amount of fetched blocks.' },
    { name: 'min', sort: 'fetchedBlocksMin', tooltip: 'Minimum time it took to fetch a block.' },
    { name: 'max', sort: 'fetchedBlocksMax', tooltip: 'Maximum time it took to fetch a block.' },
    { name: 'avg', sort: 'fetchedBlocksAvg', tooltip: 'Average time it took to fetch a block.' },
    { name: 'amount', sort: 'appliedBlocks', tooltip: 'Total amount of applied blocks.' },
    { name: 'min', sort: 'appliedBlocksMin', tooltip: 'Minimum time it took to apply a block.' },
    { name: 'max', sort: 'appliedBlocksMax', tooltip: 'Maximum time it took to apply a block.' },
    { name: 'avg', sort: 'appliedBlocksAvg', tooltip: 'Average time it took to apply a block.' },
  ];

  private indexFromRoute: number;

  @ViewChild('thGroupsTemplate') private thGroupsTemplate: TemplateRef<void>;

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToRouteChange();
    this.listenToNodesChanges();
    this.listenToActiveNodeChange();
    this.listenToSidePanelOpening();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [50, 100, 80, 140, 80, 65, 65, 80, 80, 65, 65, 80];
    this.table.propertyForActiveCheck = 'index';
    this.table.thGroupsTemplate = this.thGroupsTemplate;
    this.table.sortClz = DswBootstrapSortNodes;
    this.table.sortSelector = selectDswBootstrapSort;
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      if (route.params['index'] && this.table.rows.length === 0) {
        this.indexFromRoute = Number(route.params['index']);
      }
    }, take(1));
  }

  private listenToNodesChanges(): void {
    this.select(selectDswBootstrapNodes, (nodes: DswBootstrapNode[]) => {
      this.table.rows = nodes;
      this.table.detect();
      if (hasValue(this.indexFromRoute)) {
        this.scrollToElement();
      }
      this.detect();
    }, filter(nodes => nodes.length > 0));
  }

  private listenToActiveNodeChange(): void {
    this.select(selectDswBootstrapActiveNode, (node: DswBootstrapNode) => {
      this.table.activeRow = node;
      this.table.detect();
      this.detect();
    });
  }

  private scrollToElement(): void {
    const finder = (node: DswBootstrapNode) => node.index === this.indexFromRoute;
    const i = this.table.rows.findIndex(finder);
    this.table.scrollToElement(finder);
    delete this.indexFromRoute;
    this.onRowClick(this.table.rows[i]);
  }

  protected override onRowClick(row: DswBootstrapNode): void {
    if (this.table.activeRow?.index !== row?.index) {
      this.dispatch(DswBootstrapSetActiveBlock, row);
      this.router.navigate([Routes.NODES, Routes.BOOTSTRAP, row.index], { queryParamsHandling: 'merge' });
    }
  }

  toggleSidePanel(): void {
    this.dispatch(DswBootstrapToggleSidePanel);
  }

  private listenToSidePanelOpening(): void {
    this.select(selectDswBootstrapOpenSidePanel, (open: boolean) => {
      this.openSidePanel = !!open;
      this.detect();
    }, mergeMap((open: boolean) => of(open).pipe(delay(open ? 0 : 250))));
  }
}
