import { ActionReducer, combineReducers } from '@ngrx/store';
import { DswState } from '@ocfe-dsw/dsw.state';

import * as fromDashboard from '@ocfe-dsw/dashboard/dsw-dashboard.reducer';
import { DswDashboardAction, DswDashboardActions } from '@ocfe-dsw/dashboard/dsw-dashboard.actions';

import * as fromActions from '@ocfe-dsw/actions/dsw-actions.reducer';
import { DswActionsAction, DswActionsActions } from '@ocfe-dsw/actions/dsw-actions.actions';

import * as fromBootstrap from '@ocfe-dsw/bootstrap/dsw-bootstrap.reducer';
import { DswBootstrapAction, DswBootstrapActions } from '@ocfe-dsw/bootstrap/dsw-bootstrap.actions';

import * as fromFrontier from '@ocfe-dsw/frontier/dsw-frontier.reducer';
import { DswFrontierAction, DswFrontierActions } from '@ocfe-dsw/frontier/dsw-frontier.actions';

import * as fromLive from '@ocfe-dsw/live/dsw-live.reducer';
import { DswLiveAction, DswLiveActions } from '@ocfe-dsw/live/dsw-live.actions';

import * as fromWorkPool from '@ocfe-dsw/work-pool/dsw-work-pool.reducer';
import { DswWorkPoolAction, DswWorkPoolActions } from '@ocfe-dsw/work-pool/dsw-work-pool.actions';

export type DswActions =
  & DswDashboardActions
  & DswBootstrapActions
  & DswActionsActions
  & DswFrontierActions
  & DswLiveActions
  & DswWorkPoolActions
  & any
  ;
export type DswAction =
  & DswDashboardAction
  & DswBootstrapAction
  & DswActionsAction
  & DswFrontierAction
  & DswLiveAction
  & DswWorkPoolAction
  ;

export const reducer: ActionReducer<DswState, DswActions> = combineReducers<DswState, DswActions>({
  dashboard: fromDashboard.reducer,
  bootstrap: fromBootstrap.reducer,
  actions: fromActions.reducer,
  frontier: fromFrontier.reducer,
  live: fromLive.reducer,
  workPool: fromWorkPool.reducer,
});
