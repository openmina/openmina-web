import { MinaState } from '@rufe-app/app.setup';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DswDashboardState } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.state';
import { DswBootstrapState } from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.state';
import { DswLiveState } from '@rufe-app/features/nodes/live/dsw-live.state';

export interface NodesState {
  dashboard: DswDashboardState;
  bootstrap: DswBootstrapState;
  live: DswLiveState;
}

const select = <T>(selector: (state: NodesState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectNodesState,
  selector,
);

export const selectNodesState = createFeatureSelector<NodesState>('nodes');
export const selectNodesDashboardState = select((state: NodesState): DswDashboardState => state.dashboard);
export const selectNodesBootstrapState = select((state: NodesState): DswBootstrapState => state.bootstrap);
export const selectNodesLiveState = select((state: NodesState): DswLiveState => state.live);
