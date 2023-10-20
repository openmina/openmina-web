import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromErrorPreview from '@rufe-error-preview/error-preview.reducer';
import { ErrorPreviewAction } from '@rufe-error-preview/error-preview.actions';
import { ErrorPreviewState } from '@rufe-error-preview/error-preview.state';

import * as fromApp from '@rufe-app/app.reducer';
import { AppAction } from '@rufe-app/app.actions';
import { AppState } from '@rufe-app/app.state';

import * as fromLoading from '@rufe-app/layout/toolbar/loading.reducer';
import { LoadingState } from '@rufe-app/layout/toolbar/loading.reducer';

import * as fromDashboard from '@rufe-dashboard/dashboard.reducer';
import { DashboardAction } from '@rufe-dashboard/dashboard.actions';
import { DashboardState } from '@rufe-dashboard/dashboard.state';

import * as fromNodes from '@rufe-nodes/nodes.reducer';
import { NodesAction } from '@rufe-nodes/nodes.reducer';
import { NodesState } from '@rufe-nodes/nodes.state';

import * as fromState from '@rufe-state/state.reducer';
import { StateAction } from '@rufe-state/state.reducer';
import { StateState } from '@rufe-state/state.state';

import * as fromSnarks from '@rufe-snarks/snarks.reducer';
import { SnarksAction } from '@rufe-snarks/snarks.reducer';
import { SnarksState } from '@rufe-snarks/snarks.state';

import * as fromTestingTool from '@rufe-testing-tool/testing-tool.reducer';
import { TestingToolAction } from '@rufe-testing-tool/testing-tool.reducer';
import { TestingToolState } from '@rufe-testing-tool/testing-tool.state';


export interface MinaState {
  app: AppState;
  error: ErrorPreviewState;
  loading: LoadingState;
  dashboard: DashboardState;
  nodes: NodesState;
  state: StateState;
  snarks: SnarksState;
  testingTool: TestingToolState;
}

type MinaAction =
  & AppAction
  & ErrorPreviewAction
  & StateAction
  & DashboardAction
  & NodesAction
  & SnarksAction
  & TestingToolAction
  ;

export const reducers: ActionReducerMap<MinaState, MinaAction> = {
  app: fromApp.reducer,
  error: fromErrorPreview.reducer,
  loading: fromLoading.reducer,
  dashboard: fromDashboard.reducer,
  nodes: fromNodes.reducer,
  state: fromState.reducer,
  snarks: fromSnarks.reducer,
  testingTool: fromTestingTool.reducer,
};

export const metaReducers: MetaReducer<MinaState, MinaAction>[] = [];

export const selectMinaState = (state: MinaState): MinaState => state;
