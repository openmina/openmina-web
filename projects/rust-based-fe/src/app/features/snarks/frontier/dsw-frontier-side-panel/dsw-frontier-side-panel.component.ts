import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DswDashboardNode } from '@rufe-shared/types/nodes/dashboard/dsw-dashboard-node.type';

@Component({
  selector: 'mina-dsw-frontier-side-panel',
  templateUrl: './dsw-frontier-side-panel.component.html',
  styleUrls: ['./dsw-frontier-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswFrontierSidePanelComponent {

  node: DswDashboardNode = {
    // status: AppNodeStatusTypes.SYNCED,
    // name: 'Node 1',
    // bestTip: '1586',
    // fork: '7690',
    // blocksApplied: Math.floor(Math.random() * 100),
    // blocksAppliedMax: Math.floor(Math.random() * 100) + 100,
    // missingBlocks: Math.floor(Math.random() * 100),
    // missingBlocksMax: Math.floor(Math.random() * 100) + 100,
    // downloadingBlocks: Math.floor(Math.random() * 100),
    // downloadingBlocksMax: Math.floor(Math.random() * 100) + 100,
    // details: mockDetail(),
  } as any;

  closeSidePanel(): void {
  }
}
