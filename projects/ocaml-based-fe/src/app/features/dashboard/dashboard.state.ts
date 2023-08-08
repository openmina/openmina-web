import { MinaState } from '@ocfe-app/app.setup';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DashboardNodesState } from '@ocfe-dashboard/nodes/dashboard-nodes.state';
import { DashboardSplitsState } from '@ocfe-dashboard/splits/dashboard-splits.state';

export interface DashboardState {
  nodes: DashboardNodesState;
  splits: DashboardSplitsState;
}

const select = <T>(selector: (state: DashboardState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectDashboardState,
  selector,
);

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');
export const selectDashboardNodesState = select((state: DashboardState): DashboardNodesState => state.nodes);
export const selectDashboardSplitsState = select((state: DashboardState): DashboardSplitsState => state.splits);
