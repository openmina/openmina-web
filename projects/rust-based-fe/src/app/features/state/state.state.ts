import { MinaState } from '@rufe-app/app.setup';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DswActionsState } from '@rufe-app/features/state/actions/dsw-actions.state';

export interface StateState {
  actions: DswActionsState;
}

const select = <T>(selector: (state: StateState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectStateState,
  selector,
);

export const selectStateState = createFeatureSelector<StateState>('state');
export const selectStateActionsState = select((state: StateState): DswActionsState => state.actions);
