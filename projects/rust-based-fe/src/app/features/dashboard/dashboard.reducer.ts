import { DashboardState } from '@rufe-dashboard/dashboard.state';
import { DASHBOARD_CLOSE, DashboardActions } from '@rufe-dashboard/dashboard.actions';

const initialState: DashboardState = {
  peers: [],
  connectedPeers: 0,
  disconnectedPeers: 0,
  connectingPeers: 0,
  nodeBootstrappingPercentage: 0,
  appliedBlocks: 0,
  maxBlockHeightSeen: 0,
  berkeleyBlockHeight: 0,
  receivedBlocks: 0,
  receivedTxs: 0,
  receivedSnarks: 0,
};

export function reducer(state: DashboardState = initialState, action: DashboardActions): DashboardState {
  switch (action.type) {

    case DASHBOARD_CLOSE:
      return initialState;

    default:
      return state;
  }
}
