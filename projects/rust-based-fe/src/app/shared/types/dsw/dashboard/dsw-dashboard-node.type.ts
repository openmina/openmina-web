import { DswDashboardLedger } from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-ledger.type';
import { DswDashboardBlock } from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-block.type';

export interface DswDashboardNode {
  name: string;
  kind: DswDashboardNodeKindType;
  bestTipReceived: string;
  bestTipReceivedTimestamp: number;
  bestTip: string;
  height: number;
  globalSlot: number;
  appliedBlocks: number;
  applyingBlocks: number;
  missingBlocks: number;
  fetchingBlocks: number;
  fetchedBlocks: number;
  ledgers: DswDashboardLedger;
  blocks: DswDashboardBlock[];
}

export enum DswDashboardNodeKindType {
  BOOTSTRAP = 'Bootstrap',
  CATCHUP = 'Catchup',
  SYNCED = 'Synced',
  OFFLINE = 'Offline',
}
