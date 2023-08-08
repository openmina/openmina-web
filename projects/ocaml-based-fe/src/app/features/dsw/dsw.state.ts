import { MinaState } from '@ocfe-app/app.setup';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DswActionsState } from '@ocfe-dsw/actions/dsw-actions.state';
import { DswDashboardState } from '@ocfe-dsw/dashboard/dsw-dashboard.state';
import { DswFrontierState } from '@ocfe-dsw/frontier/dsw-frontier.state';
import { DswBootstrapState } from '@ocfe-dsw/bootstrap/dsw-bootstrap.state';
import { DswLiveState } from '@ocfe-dsw/live/dsw-live.state';
import { DswWorkPoolState } from '@ocfe-dsw/work-pool/dsw-work-pool.state';

export interface DswState {
  dashboard: DswDashboardState;
  bootstrap: DswBootstrapState;
  actions: DswActionsState;
  frontier: DswFrontierState;
  live: DswLiveState;
  workPool: DswWorkPoolState;
}

const select = <T>(selector: (state: DswState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectDswState,
  selector,
);

export const selectDswState = createFeatureSelector<DswState>('dsw');
export const selectDswDashboardState = select((state: DswState): DswDashboardState => state.dashboard);
export const selectDswBootstrapState = select((state: DswState): DswBootstrapState => state.bootstrap);
export const selectDswActionsState = select((state: DswState): DswActionsState => state.actions);
export const selectDswFrontierState = select((state: DswState): DswFrontierState => state.frontier);
export const selectDswLiveState = select((state: DswState): DswLiveState => state.live);
export const selectDswWorkPoolState = select((state: DswState): DswWorkPoolState => state.workPool);
