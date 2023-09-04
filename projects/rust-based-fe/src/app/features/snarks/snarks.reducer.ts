import { ActionReducer, combineReducers } from '@ngrx/store';

import { SnarksState } from '@rufe-snarks/snarks.state';

import * as fromWorkPool from '@rufe-snarks/work-pool/dsw-work-pool.reducer';
import { DswWorkPoolAction, DswWorkPoolActions } from '@rufe-snarks/work-pool/dsw-work-pool.actions';

import * as fromScanState from '@rufe-snarks/scan-state/scan-state.reducer';
import { ScanStateAction, ScanStateActions } from '@rufe-snarks/scan-state/scan-state.actions';

export type SnarksActions =
  & DswWorkPoolActions
  & ScanStateActions
  ;
export type SnarksAction =
  & DswWorkPoolAction
  & ScanStateAction
  ;

export const reducer: ActionReducer<SnarksState, SnarksActions> = combineReducers<SnarksState, SnarksActions>({
  workPool: fromWorkPool.reducer,
  scanState: fromScanState.reducer,
});
