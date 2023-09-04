import { DswActionColumn } from '@rufe-shared/types/state/actions/dsw-action-column.type';

export interface DswActionGroupAction {
  display: boolean;
  title: string;
  fullTitle: string;
  totalTime: number;
  meanTime: number;
  totalCount: number;
  columns: DswActionColumn[];
}
