import { DswDashboardNode } from '@ocfe-shared/types/dsw/dashboard/dsw-dashboard-node.type';
import { DswLiveBlockEvent } from '@ocfe-shared/types/dsw/live/dsw-live-block-event.type';

export interface DswLiveNode extends DswDashboardNode {
  index: number;
  events: DswLiveBlockEvent[];
}