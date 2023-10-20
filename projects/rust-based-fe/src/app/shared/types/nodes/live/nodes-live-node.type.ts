import { NodesLiveBlockEvent } from '@rufe-shared/types/nodes/live/nodes-live-block-event.type';
import { NodesOverviewNode } from '@rufe-shared/types/nodes/dashboard/nodes-overview-node.type';

export interface NodesLiveNode extends NodesOverviewNode {
  index: number;
  events: NodesLiveBlockEvent[];
}
