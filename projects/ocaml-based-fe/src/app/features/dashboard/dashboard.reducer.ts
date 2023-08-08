import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromNodes from '@ocfe-dashboard/nodes/dashboard-nodes.reducer';
import * as fromSplits from '@ocfe-dashboard/splits/dashboard-splits.reducer';
import { DashboardState } from '@ocfe-dashboard/dashboard.state';
import { DashboardNodesAction, DashboardNodesActions } from '@ocfe-dashboard/nodes/dashboard-nodes.actions';
import { DashboardSplitsAction, DashboardSplitsActions } from '@ocfe-dashboard/splits/dashboard-splits.actions';

export type DashboardActions =
  & DashboardNodesActions
  & DashboardSplitsActions
  ;
export type DashboardAction =
  & DashboardNodesAction
  & DashboardSplitsAction
  ;

export const reducer: ActionReducer<DashboardState, DashboardActions> = combineReducers<DashboardState, DashboardActions>({
  nodes: fromNodes.reducer,
  splits: fromSplits.reducer,
});
