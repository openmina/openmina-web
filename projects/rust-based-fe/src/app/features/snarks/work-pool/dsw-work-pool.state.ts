import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';
import { TableSort } from '@openmina/shared';
import { WorkPool } from '@rufe-shared/types/snarks/work-pool/work-pool.type';
import { WorkPoolSpecs } from '@rufe-shared/types/snarks/work-pool/work-pool-specs.type';
import { WorkPoolDetail } from '@rufe-shared/types/snarks/work-pool/work-pool-detail.type';
import { selectSnarksWorkPoolState } from '@rufe-snarks/snarks.state';

export interface DswWorkPoolState {
  workPools: WorkPool[];
  filteredWorkPools: WorkPool[];
  activeWorkPool: WorkPool;
  openSidePanel: boolean;
  sort: TableSort<WorkPool>;
  filters: string[];
  activeWorkPoolSpecs: WorkPoolSpecs;
  activeWorkPoolDetail: WorkPoolDetail;
}

const select = <T>(selector: (state: DswWorkPoolState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectSnarksWorkPoolState,
  selector,
);

export const selectDswWorkPools = select((state: DswWorkPoolState): WorkPool[] => state.filteredWorkPools);
export const selectDswWorkPoolActiveWorkPool = select((state: DswWorkPoolState): WorkPool => state.activeWorkPool);
export const selectDswWorkPoolOpenSidePanel = select((state: DswWorkPoolState): boolean => state.openSidePanel);
export const selectDswWorkPoolSort = select((state: DswWorkPoolState): TableSort<WorkPool> => state.sort);
export const selectDswWorkPoolFilters = select((state: DswWorkPoolState): string[] => state.filters);
export const selectDswWorkPoolActiveWorkPoolSpecs = select((state: DswWorkPoolState): WorkPoolSpecs => state.activeWorkPoolSpecs);
export const selectDswWorkPoolActiveWorkPoolDetail = select((state: DswWorkPoolState): WorkPoolDetail => state.activeWorkPoolDetail);
