import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { DashboardSplitsPeer } from '@ocfe-shared/types/dashboard/splits/dashboard-splits-peer.type';
import { isDesktop, TableColumnList } from '@openmina/shared';
import { Router } from '@angular/router';
import {
  DashboardSplitsSetActivePeer,
  DashboardSplitsSortPeers
} from '@ocfe-dashboard/splits/dashboard-splits.actions';
import {
  selectDashboardSplitsActivePeer,
  selectDashboardSplitsSort
} from '@ocfe-dashboard/splits/dashboard-splits.state';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { MinaTableOcamlWrapper } from '@ocfe-shared/base-classes/mina-table-ocaml-wrapper.class';

@Component({
    selector: 'mina-dashboard-splits-side-panel-table',
    templateUrl: './dashboard-splits-side-panel-table.component.html',
    styleUrls: ['./dashboard-splits-side-panel-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DashboardSplitsSidePanelTableComponent extends MinaTableOcamlWrapper<DashboardSplitsPeer> implements OnInit {

  @Input() peers: DashboardSplitsPeer[];
  @HostBinding('style.height.px') private height: number;

  protected readonly tableHeads: TableColumnList<DashboardSplitsPeer> = [
    { name: 'address' },
    { name: 'name', sort: 'node' },
    { name: 'peer ID', sort: 'peerId' },
    { name: 'Conn. \nIn / Out', sort: 'outgoingConnections' },
  ];

  private activePeer: DashboardSplitsPeer;

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    this.height = isDesktop() ? (this.peers.length + 1) * 36 : ((this.peers.length) * 104) + 90;
    await super.ngOnInit();
    this.listenToActivePeerChanges();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [115, 85, 80, '1fr'];
    this.table.minWidth = 400;
    this.table.sortClz = DashboardSplitsSortPeers;
    this.table.sortSelector = selectDashboardSplitsSort;
    this.table.rows = this.peers;
  }

  protected override onRowClick(row: DashboardSplitsPeer): void {
    if (row) {
      this.router.navigate([Routes.DASHBOARD, Routes.TOPOLOGY, row.address]);
    }
    if (this.activePeer === row) {
      this.router.navigate([Routes.DASHBOARD, Routes.TOPOLOGY]);
      this.dispatch(DashboardSplitsSetActivePeer, undefined);
      return;
    }
    this.dispatch(DashboardSplitsSetActivePeer, row);
  }

  private listenToActivePeerChanges(): void {
    this.select(selectDashboardSplitsActivePeer, (activePeer: DashboardSplitsPeer) => {
      this.activePeer = activePeer;
      this.table.activeRow = activePeer;
      this.table.detect();
      this.detect();
    });
  }
}
