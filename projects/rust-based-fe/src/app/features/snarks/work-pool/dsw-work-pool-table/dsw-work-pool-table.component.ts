import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { getMergedRoute, MergedRoute, SecDurationConfig, TableColumnList } from '@openmina/shared';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Routes } from '@rufe-shared/enums/routes.enum';
import { WorkPool } from '@rufe-shared/types/snarks/work-pool/work-pool.type';
import {
  DswWorkPoolSetActiveWorkPool,
  DswWorkPoolSortWorkPool,
  DswWorkPoolToggleSidePanel
} from '@rufe-snarks/work-pool/dsw-work-pool.actions';
import {
  selectDswWorkPoolActiveWorkPool,
  selectDswWorkPoolOpenSidePanel,
  selectDswWorkPools,
  selectDswWorkPoolSort
} from '@rufe-snarks/work-pool/dsw-work-pool.state';
import { MinaTableRustWrapper } from '@rufe-shared/base-classes/mina-table-rust-wrapper.class';

@Component({
  selector: 'mina-dsw-work-pool-table',
  templateUrl: './dsw-work-pool-table.component.html',
  styleUrls: ['./dsw-work-pool-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswWorkPoolTableComponent extends MinaTableRustWrapper<WorkPool> implements OnInit {

  readonly secConfig: SecDurationConfig = {
    color: true,
    undefinedAlternative: '-',
    default: 100,
    warn: 500,
    severe: 1000
  };
  protected readonly tableHeads: TableColumnList<WorkPool> = [
    { name: 'datetime', sort: 'timestamp' },
    { name: 'id' },
    { name: 'status', sort: 'commitment' },
    { name: 'created latency', sort: 'commitmentCreatedLatency' },
    { name: 'received latency', sort: 'commitmentRecLatency' },
    { name: 'origin', sort: 'commitmentOrigin' },
    { name: 'status', sort: 'snark' },
    { name: 'received latency', sort: 'snarkRecLatency' },
    { name: 'origin', sort: 'snarkOrigin' },
  ];

  openSidePanel: boolean;

  @ViewChild('thGroupsTemplate') private thGroupsTemplate: TemplateRef<void>;

  private wpFromRoute: string;

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToRouteChange();
    this.listenToNodesChanges();
    this.listenToActiveNodeChange();
    this.listenToSidePanelToggling();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [165, 140, 110, 150, 150, 100, 110, 150, 100];
    this.table.propertyForActiveCheck = 'id';
    this.table.thGroupsTemplate = this.thGroupsTemplate;
    this.table.sortClz = DswWorkPoolSortWorkPool;
    this.table.sortSelector = selectDswWorkPoolSort;
  }

  toggleSidePanel(): void {
    this.dispatch(DswWorkPoolToggleSidePanel);
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      if (route.params['id'] && this.table.rows.length === 0) {
        this.wpFromRoute = route.params['id'];
      }
    }, take(1));
  }

  private listenToNodesChanges(): void {
    this.select(selectDswWorkPools, (wp: WorkPool[]) => {
      this.table.rows = wp;
      this.table.detect();
      if (this.wpFromRoute && wp.length > 0) {
        this.scrollToElement();
      }
      this.detect();
    });
  }

  private listenToActiveNodeChange(): void {
    this.select(selectDswWorkPoolActiveWorkPool, (activeWp: WorkPool) => {
      this.table.activeRow = activeWp;
      this.table.detect();
      this.detect();
    });
  }

  private scrollToElement(): void {
    const finder = (node: WorkPool) => node.id === this.wpFromRoute;
    const i = this.table.rows.findIndex(finder);
    this.table.scrollToElement(finder);
    delete this.wpFromRoute;
    this.onRowClick(this.table.rows[i]);
  }

  protected override onRowClick(row: WorkPool): void {
    if (!row) {
      return;
    }
    if (this.table.activeRow?.id !== row?.id) {
      this.dispatch(DswWorkPoolSetActiveWorkPool, { id: row.id });
      this.router.navigate([Routes.SNARKS, Routes.WORK_POOL, row.id], { queryParamsHandling: 'merge' });
    }
  }

  private listenToSidePanelToggling(): void {
    this.select(selectDswWorkPoolOpenSidePanel, (open: boolean) => {
      this.openSidePanel = open;
      this.detect();
    });
  }
}
