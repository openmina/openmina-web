import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromDashboard from '@rufe-app/features/nodes/dashboard/dsw-dashboard.reducer';
import { DswDashboardAction, DswDashboardActions } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.actions';

import * as fromBootstrap from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.reducer';
import { DswBootstrapAction, DswBootstrapActions } from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.actions';

import * as fromLive from '@rufe-app/features/nodes/live/dsw-live.reducer';
import { DswLiveAction, DswLiveActions } from '@rufe-app/features/nodes/live/dsw-live.actions';
import { NodesState } from '@rufe-nodes/nodes.state';

export type NodesActions =
  & DswDashboardActions
  & DswBootstrapActions
  & DswLiveActions
  ;
export type NodesAction =
  & DswDashboardAction
  & DswBootstrapAction
  & DswLiveAction
  ;

export const reducer: ActionReducer<NodesState, NodesActions> = combineReducers<NodesState, NodesActions>({
  dashboard: fromDashboard.reducer,
  bootstrap: fromBootstrap.reducer,
  live: fromLive.reducer,
});
