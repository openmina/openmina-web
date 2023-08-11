import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromActions from '@rufe-state/actions/dsw-actions.reducer';
import { DswActionsAction, DswActionsActions } from '@rufe-state/actions/dsw-actions.actions';

import { StateState } from '@rufe-state/state.state';

export type StateActions =
  & DswActionsActions
  ;
export type StateAction =
  & DswActionsAction
  ;

export const reducer: ActionReducer<StateState, StateActions> = combineReducers<StateState, StateActions>({
  actions: fromActions.reducer,
});
