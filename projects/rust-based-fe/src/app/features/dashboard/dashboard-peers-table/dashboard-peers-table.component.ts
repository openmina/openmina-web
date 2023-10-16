import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MinaTableRustWrapper } from '@rufe-shared/base-classes/mina-table-rust-wrapper.class';
import { TableColumnList } from '@openmina/shared';

interface DashboardPeer {
  status: string;
  address: string;
  latestReceivedBestTip: string;
}

@Component({
  selector: 'mina-dashboard-peers-table',
  templateUrl: './dashboard-peers-table.component.html',
  styleUrls: ['./dashboard-peers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column h-100' },
})
export class DashboardPeersTableComponent extends MinaTableRustWrapper<DashboardPeer> {

  protected readonly tableHeads: TableColumnList<DashboardPeer> = [
    { name: 'connection status' },
    { name: 'address' },
    { name: 'latest received best tip' },
  ];

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToScenariosChanges();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [150, 150, 250];
    this.table.minWidth = 550;
  }

  private listenToScenariosChanges(): void {
      this.table.rows = [
        {
          status: 'connected',
          address: '65.108.32.42:8302',
          latestReceivedBestTip: '3NLU8dgWBvQcT3h9yrq9DezpkvzZ7VCX3FtvX3uqEZSETeyGgoJZ',
        },
        {
          status: 'connected',
          address: '65.108.32.42:8302',
          latestReceivedBestTip: '3NLU8dgWBvQcT3h9yrq9DezpkvzZ7VCX3FtvX3uqEZSETeyGgoJZ',
        },
        {
          status: 'connecting',
          address: '43.2365.46.32:8302',
          latestReceivedBestTip: '3NLU8dgWBvQcT3h9yrq9DezpkvzZ7VCX3FtvX3uqEZSETeyGgoJZ',
        },
        {
          status: 'discovered',
          address: '56.547.4.76:8302',
          latestReceivedBestTip: '3NLU8dgWBvQcT3h9yrq9DezpkvzZ7VCX3FtvX3uqEZSETeyGgoJZ',
        }
      ]
      this.table.detect();
      this.detect();
  }

  protected override onRowClick(row: DashboardPeer): void {
  }

}
