import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromWorkPool from '@rufe-snarks/work-pool/dsw-work-pool.reducer';
import { DswWorkPoolAction, DswWorkPoolActions } from '@rufe-snarks/work-pool/dsw-work-pool.actions';
import { SnarksState } from '@rufe-snarks/snarks.state';

export type SnarksActions =
  & DswWorkPoolActions
  ;
export type SnarksAction =
  & DswWorkPoolAction
  ;

export const reducer: ActionReducer<SnarksState, SnarksActions> = combineReducers<SnarksState, SnarksActions>({
  workPool: fromWorkPool.reducer,
});
