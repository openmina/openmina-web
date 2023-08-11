import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getMergedRoute, MergedRoute, TableColumnList } from '@openmina/shared';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { Routes } from '@rufe-shared/enums/routes.enum';
import { DswFrontierLog } from '@rufe-shared/types/dsw/frontier/dsw-frontier-log.type';
import { DswFrontierSetActiveLog, DswFrontierSortLogs } from '@rufe-snarks/frontier/dsw-frontier.actions';
import {
  selectDswFrontierActiveLog,
  selectDswFrontierLogs,
  selectDswFrontierSort
} from '@rufe-snarks/frontier/dsw-frontier.state';
import { MinaTableRustWrapper } from '@rufe-shared/base-classes/mina-table-rust-wrapper.class';

@Component({
  selector: 'mina-dsw-frontier-table',
  templateUrl: './dsw-frontier-table.component.html',
  styleUrls: ['./dsw-frontier-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswFrontierTableComponent extends MinaTableRustWrapper<DswFrontierLog> implements OnInit {

  protected readonly tableHeads: TableColumnList<DswFrontierLog> = [
    { name: 'date' },
    { name: 'level' },
    { name: 'message' },
  ];

  private nodeFromRoute: number;

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToRouteChange();
    this.listenToNodesChanges();
    this.listenToActiveNodeChange();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [165, 150, 300];
    this.table.propertyForActiveCheck = 'id';
    this.table.sortClz = DswFrontierSortLogs;
    this.table.sortSelector = selectDswFrontierSort;
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      if (route.params['log'] && this.table.rows.length === 0) {
        this.nodeFromRoute = Number(route.params['log']);
      }
    }, take(1));
  }

  private listenToNodesChanges(): void {
    this.select(selectDswFrontierLogs, (logs: DswFrontierLog[]) => {
      this.table.rows = logs;
      this.table.detect();
      if (this.nodeFromRoute) {
        this.scrollToElement();
      }
      this.detect();
    }, filter(logs => logs.length > 0));
  }

  private listenToActiveNodeChange(): void {
    this.select(selectDswFrontierActiveLog, (log: DswFrontierLog) => {
      this.table.activeRow = log;
      this.table.detect();
      this.detect();
    });
  }

  private scrollToElement(): void {
    const finder = (node: DswFrontierLog) => node.id === this.nodeFromRoute;
    const i = this.table.rows.findIndex(finder);
    this.table.scrollToElement(finder);
    delete this.nodeFromRoute;
    this.onRowClick(this.table.rows[i]);
  }

  protected override onRowClick(row: DswFrontierLog): void {
    if (this.table.activeRow?.id !== row?.id) {
      this.dispatch(DswFrontierSetActiveLog, row);
      this.router.navigate([Routes.SNARKS, Routes.FRONTIER, row.id], { queryParamsHandling: 'merge' });
    }
  }
}
