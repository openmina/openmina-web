import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NodesOverviewBlock } from '@rufe-shared/types/nodes/dashboard/nodes-overview-block.type';
import { NodesLiveNode } from '@rufe-shared/types/nodes/live/nodes-live-node.type';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectNodesLiveActiveNode } from '../nodes-live.state';
import { lastItem } from '@openmina/shared';

@Component({
    selector: 'mina-nodes-live-blocks-map',
    templateUrl: './nodes-live-blocks-map.component.html',
    styleUrls: ['./nodes-live-blocks-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-minus-lg flex-column' },
    standalone: false
})
export class NodesLiveBlocksMapComponent extends StoreDispatcher implements OnInit {

  blocks: NodesOverviewBlock[] = [];
  rootBlock: NodesOverviewBlock;
  bestTipBlock: NodesOverviewBlock;

  ngOnInit(): void {
    this.listenToBestTip();
  }

  private listenToBestTip(): void {
    this.select(selectNodesLiveActiveNode, (node: NodesLiveNode) => {
      this.rootBlock = null;
      this.bestTipBlock = null;
      this.blocks = (node?.blocks || []).slice().reverse();
      if (this.blocks.length === 291) {
        this.rootBlock = this.blocks[0];
        this.blocks = this.blocks.slice(1);
      }
      if (this.blocks.length > 0) {
        this.bestTipBlock = lastItem(this.blocks);
        this.blocks = this.blocks.slice(0, -1);
      }
      this.detect();
    });
  }
}
