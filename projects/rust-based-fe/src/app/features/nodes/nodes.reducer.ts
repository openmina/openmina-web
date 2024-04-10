import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromDashboard from '@rufe-nodes/overview/nodes-overview.reducer';
import { NodesOverviewAction, NodesOverviewActions } from '@rufe-nodes/overview/nodes-overview.actions';

import * as fromBootstrap from '@rufe-nodes/bootstrap/nodes-bootstrap.reducer';
import { NodesBootstrapAction, NodesBootstrapActions } from '@rufe-nodes/bootstrap/nodes-bootstrap.actions';

import * as fromLive from '@rufe-nodes/live/nodes-live.reducer';
import { NodesLiveAction, NodesLiveActions } from '@rufe-nodes/live/nodes-live.actions';
import { NodesState } from '@rufe-nodes/nodes.state';

export type NodesActions =
  & NodesOverviewActions
  & NodesBootstrapActions
  & NodesLiveActions
  ;
export type NodesAction =
  & NodesOverviewAction
  & NodesBootstrapAction
  & NodesLiveAction
  ;

export const reducer: ActionReducer<NodesState, NodesActions> = combineReducers<NodesState, NodesActions>({
  overview: fromDashboard.reducer,
  bootstrap: fromBootstrap.reducer,
  live: fromLive.reducer,
});
