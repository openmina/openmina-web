import { ScanStateTransaction } from '@rufe-shared/types/snarks/scan-state/scan-state-transaction.type';
import { ScanStateTree } from '@rufe-shared/types/snarks/scan-state/scan-state-tree.type';
import { ScanStateWorkingSnarker } from '@rufe-shared/types/snarks/scan-state/scan-state-working-snarker.type';

export interface ScanStateBlock {
  hash: string;
  height: number;
  globalSlot: number;
  transactions: ScanStateTransaction[];
  completedWorks: any[];
  workingSnarkers: ScanStateWorkingSnarker[];
  trees: ScanStateTree[];
}