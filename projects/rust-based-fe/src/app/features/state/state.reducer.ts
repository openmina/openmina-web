import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromActions from '@rufe-state/actions/state-actions.reducer';
import { StateActionsAction, StateActionsActions } from '@rufe-state/actions/state-actions.actions';

import { StateState } from '@rufe-state/state.state';

export type StateActions =
  & StateActionsActions
  ;
export type StateAction =
  & StateActionsAction
  ;

export const reducer: ActionReducer<StateState, StateActions> = combineReducers<StateState, StateActions>({
  actions: fromActions.reducer,
});
