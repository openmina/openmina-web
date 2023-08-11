import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { DswBootstrapNode } from '@rufe-shared/types/dsw/bootstrap/dsw-bootstrap-node.type';
import { selectDswBootstrapActiveNode } from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.state';
import {
  DswDashboardBlock,
  DswDashboardNodeBlockStatus
} from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-block.type';
import { SEC_CONFIG_GRAY_PALETTE, SecDurationConfig, sort, SortDirection, TableSort } from '@openmina/shared';

@Component({
  selector: 'mina-dsw-bootstrap-blocks',
  templateUrl: './dsw-bootstrap-blocks.component.html',
  styleUrls: ['./dsw-bootstrap-blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswBootstrapBlocksComponent extends StoreDispatcher implements OnInit {

  readonly secConfig: SecDurationConfig = { color: true, onlySeconds: false, colors: SEC_CONFIG_GRAY_PALETTE, severe: 10, warn: 1, default: 0.01, undefinedAlternative: '-'};
  activeNode: DswBootstrapNode;
  fetchedBlocks: DswDashboardBlock[] = [];
  appliedBlocks: DswDashboardBlock[] = [];
  activeTab: number = 0;

  ngOnInit(): void {
    this.listenToActiveNode();
  }

  private listenToActiveNode(): void {
    this.select(selectDswBootstrapActiveNode, (activeNode: DswBootstrapNode) => {
      this.activeNode = activeNode;
      this.fetchedBlocks = sortBlocks(
        activeNode?.blocks.filter(b => b.status === DswDashboardNodeBlockStatus.FETCHED || b.fetchDuration > 0) || [],
        { sortBy: 'fetchDuration', sortDirection: SortDirection.DSC },
      );
      this.appliedBlocks = sortBlocks(
        activeNode?.blocks.filter(b => b.status === DswDashboardNodeBlockStatus.APPLIED) || [],
        { sortBy: 'applyDuration', sortDirection: SortDirection.DSC },
      );
      this.detect();
    });
  }

  selectTab(tab: number): void {
    this.activeTab = tab;
  }
}

function sortBlocks(blocks: DswDashboardBlock[], tableSort: TableSort<DswDashboardBlock>): DswDashboardBlock[] {
  return sort<DswDashboardBlock>(blocks, tableSort, ['hash']);
}
