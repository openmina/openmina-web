import { DashboardSplitsLink } from '@ocfe-shared/types/dashboard/splits/dashboard-splits-link.type';
import { DashboardSplitsPeer } from '@ocfe-shared/types/dashboard/splits/dashboard-splits-peer.type';

export interface DashboardSplits {
  peers: DashboardSplitsPeer[];
  links: DashboardSplitsLink[];
}
