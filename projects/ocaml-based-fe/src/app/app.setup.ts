import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromErrorPreview from '@ocfe-error-preview/error-preview.reducer';
import { ErrorPreviewAction } from '@ocfe-error-preview/error-preview.actions';
import { ErrorPreviewState } from '@ocfe-error-preview/error-preview.state';

import * as fromNetwork from '@ocfe-network/network.reducer';
import { NetworkAction } from '@ocfe-network/network.reducer';
import { NetworkState } from '@ocfe-network/network.state';

import * as fromApp from '@ocfe-app/app.reducer';
import { AppAction } from '@ocfe-app/app.actions';
import { AppState } from '@ocfe-app/app.state';

import * as fromTracing from '@ocfe-tracing/tracing.reducer';
import { TracingAction } from '@ocfe-tracing/tracing.reducer';
import { TracingState } from '@ocfe-tracing/tracing.state';

import * as fromWebNode from '@ocfe-web-node/web-node.reducer';
import { WebNodeAction } from '@ocfe-web-node/web-node.reducer';
import { WebNodeState } from '@ocfe-web-node/web-node.state';

import * as fromBenchmarks from '@ocfe-benchmarks/benchmarks.reducer';
import { BenchmarksAction } from '@ocfe-benchmarks/benchmarks.reducer';
import { BenchmarksState } from '@ocfe-benchmarks/benchmarks.state';

import * as fromDashboard from '@ocfe-dashboard/dashboard.reducer';
import { DashboardAction } from '@ocfe-dashboard/dashboard.reducer';
import { DashboardState } from '@ocfe-dashboard/dashboard.state';

import * as fromExplorer from '@ocfe-explorer/explorer.reducer';
import { ExplorerAction } from '@ocfe-explorer/explorer.reducer';
import { ExplorerState } from '@ocfe-explorer/explorer.state';

import * as fromResources from '@ocfe-resources/resources.reducer';
import { ResourcesAction } from '@ocfe-resources/resources.reducer';
import { ResourcesState } from '@ocfe-resources/resources.state';

import * as fromLogs from '@ocfe-logs/logs.reducer';
import { LogsAction } from '@ocfe-logs/logs.actions';
import { LogsState } from '@ocfe-logs/logs.state';

import * as fromStorage from '@ocfe-storage/storage.reducer';
import { StorageAction } from '@ocfe-storage/storage.reducer';
import { StorageState } from '@ocfe-storage/storage.state';

import * as fromLoading from '@ocfe-app/layout/toolbar/loading.reducer';
import { LoadingState } from '@ocfe-app/layout/toolbar/loading.reducer';


export interface MinaState {
  app: AppState;
  error: ErrorPreviewState;
  network: NetworkState;
  tracing: TracingState;
  webNode: WebNodeState;
  benchmarks: BenchmarksState;
  dashboard: DashboardState;
  explorer: ExplorerState;
  resources: ResourcesState;
  logs: LogsState;
  storage: StorageState;
  loading: LoadingState;
}

type MinaAction =
  & AppAction
  & ErrorPreviewAction
  & NetworkAction
  & TracingAction
  & WebNodeAction
  & BenchmarksAction
  & DashboardAction
  & ExplorerAction
  & ResourcesAction
  & LogsAction
  & StorageAction
  ;

export const reducers: ActionReducerMap<MinaState, MinaAction> = {
  app: fromApp.reducer,
  error: fromErrorPreview.reducer,
  network: fromNetwork.reducer,
  tracing: fromTracing.reducer,
  webNode: fromWebNode.reducer,
  benchmarks: fromBenchmarks.reducer,
  dashboard: fromDashboard.reducer,
  explorer: fromExplorer.reducer,
  resources: fromResources.reducer,
  logs: fromLogs.reducer,
  storage: fromStorage.reducer,
  loading: fromLoading.reducer,
};

export const metaReducers: MetaReducer<MinaState, MinaAction>[] = [];

export const selectMinaState = (state: MinaState): MinaState => state;
