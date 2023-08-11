import { DswLiveBlockEvent } from '@rufe-shared/types/dsw/live/dsw-live-block-event.type';
import { DswDashboardNode } from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-node.type';

export interface DswLiveNode extends DswDashboardNode {
  index: number;
  events: DswLiveBlockEvent[];
}