import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';
import { DswActionGroup } from '@rufe-shared/types/state/actions/dsw-action-group.type';
import { TableSort } from '@openmina/shared';
import { DswActionsStats } from '@rufe-shared/types/state/actions/dsw-actions-stats.type';
import { selectStateActionsState } from '@rufe-state/state.state';

export interface DswActionsState {
  groups: DswActionGroup[];
  filteredGroups: DswActionGroup[];
  openSidePanel: boolean;
  earliestSlot: number;
  activeSlot: number;
  currentSort: TableSort<DswActionGroup>;
  activeSearch: string;
  stats: DswActionsStats
}

const select = <T>(selector: (state: DswActionsState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectStateActionsState,
  selector,
);

export const selectDswActionsGroups = select((state: DswActionsState): DswActionGroup[] => state.filteredGroups);
export const selectDswActionsOpenSidePanel = select((state: DswActionsState): boolean => state.openSidePanel);
export const selectDswActionsActiveSlotAndStats = select((state: DswActionsState): [number, DswActionsStats] => [state.activeSlot, state.stats]);
export const selectDswActionsToolbarValues = select((state: DswActionsState): {
  earliestSlot: number;
  activeSlot: number;
  currentSort: TableSort<DswActionGroup>;
  activeSearch: string;
} => ({
  earliestSlot: state.earliestSlot,
  activeSlot: state.activeSlot,
  currentSort: state.currentSort,
  activeSearch: state.activeSearch,
}));
export const selectDswActionsSort = select((state: DswActionsState): TableSort<DswActionGroup> => state.currentSort);

