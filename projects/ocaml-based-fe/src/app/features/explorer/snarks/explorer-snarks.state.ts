import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { TableSort } from '@ocfe-shared/types/shared/table-sort.type';
import { selectExplorerSnarksState } from '@ocfe-explorer/explorer.state';
import { ExplorerSnark } from '@ocfe-shared/types/explorer/snarks/explorer-snarks.type';

export interface ExplorerSnarksState {
  snarks: ExplorerSnark[];
  sort: TableSort<ExplorerSnark>;
  activeSnark: ExplorerSnark;
}

const select = <T>(selector: (state: ExplorerSnarksState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectExplorerSnarksState,
  selector,
);

export const selectExplorerSnarks = select((state: ExplorerSnarksState): ExplorerSnark[] => state.snarks);
export const selectExplorerSnarksSorting = select((state: ExplorerSnarksState): TableSort<ExplorerSnark> => state.sort);
export const selectExplorerSnarksActiveSnark = select((state: ExplorerSnarksState): ExplorerSnark => state.activeSnark);
