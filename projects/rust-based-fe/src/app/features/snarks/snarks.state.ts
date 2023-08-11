import { MinaState } from '@rufe-app/app.setup';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DswWorkPoolState } from '@rufe-snarks/work-pool/dsw-work-pool.state';

export interface SnarksState {
  workPool: DswWorkPoolState;
}

const select = <T>(selector: (state: SnarksState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectSnarksState,
  selector,
);

export const selectSnarksState = createFeatureSelector<SnarksState>('snarks');
export const selectSnarksWorkPoolState = select((state: SnarksState): DswWorkPoolState => state.workPool);
