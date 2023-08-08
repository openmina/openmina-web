import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { selectTracingOverviewState } from '@ocfe-tracing/tracing.state';
import { TracingOverviewCheckpoint } from '@ocfe-shared/types/tracing/overview/tracing-overview-checkpoint.type';
import { SortDirection } from '@ocfe-shared/types/shared/table-sort.type';

export interface TracingOverviewState {
  checkpoints: TracingOverviewCheckpoint[];
  sortDirection: SortDirection;
  condensedView: boolean;
}

const select = <T>(selector: (state: TracingOverviewState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectTracingOverviewState,
  selector,
);
export const selectTracingOverviewCheckpoints = select((state: TracingOverviewState): TracingOverviewCheckpoint[] => state.checkpoints);
export const selectTracingOverviewSortDirection = select((state: TracingOverviewState): SortDirection => state.sortDirection);
export const selectTracingOverviewCondensedView = select((state: TracingOverviewState): boolean => state.condensedView);
