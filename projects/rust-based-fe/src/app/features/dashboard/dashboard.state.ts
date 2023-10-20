import { DashboardPeer } from '@rufe-shared/types/dashboard/dashboard-peer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';

export interface DashboardState {
  peers: DashboardPeer[];
  connectedPeers: number;
  disconnectedPeers: number;
  connectingPeers: number;
  nodeBootstrappingPercentage: number;
  appliedBlocks: number;
  maxBlockHeightSeen: number;
  berkeleyBlockHeight: number;
  receivedBlocks: number;
  receivedTxs: number;
  receivedSnarks: number;
}

const select = <T>(selector: (state: DashboardState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectDashboardState,
  selector,
);

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');
export const selectDashboardPeers = select((state: DashboardState): DashboardPeer[] => state.peers);
