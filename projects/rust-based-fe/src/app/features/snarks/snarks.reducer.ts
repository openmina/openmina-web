import { ActionReducer, combineReducers } from '@ngrx/store';

import { SnarksState } from '@rufe-snarks/snarks.state';

import * as fromWorkPool from '@rufe-snarks/work-pool/snarks-work-pool.reducer';
import { SnarksWorkPoolAction, SnarksWorkPoolActions } from '@rufe-snarks/work-pool/snarks-work-pool.actions';

import * as fromScanState from '@rufe-snarks/scan-state/scan-state.reducer';
import { ScanStateAction, ScanStateActions } from '@rufe-snarks/scan-state/scan-state.actions';

export type SnarksActions =
  & SnarksWorkPoolActions
  & ScanStateActions
  ;
export type SnarksAction =
  & SnarksWorkPoolAction
  & ScanStateAction
  ;

export const reducer: ActionReducer<SnarksState, SnarksActions> = combineReducers<SnarksState, SnarksActions>({
  workPool: fromWorkPool.reducer,
  scanState: fromScanState.reducer,
});
