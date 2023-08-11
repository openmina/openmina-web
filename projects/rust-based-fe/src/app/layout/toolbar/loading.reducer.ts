import { FeatureAction } from '@openmina/shared';
import { MinaState } from '@rufe-app/app.setup';
import { APP_INIT, APP_INIT_SUCCESS } from '@rufe-app/app.actions';
import {
  DSW_ACTIONS_CLOSE,
  DSW_ACTIONS_GET_ACTIONS,
  DSW_ACTIONS_GET_ACTIONS_SUCCESS,
  DSW_ACTIONS_GET_EARLIEST_SLOT,
  DSW_ACTIONS_GET_EARLIEST_SLOT_SUCCESS,
} from '@rufe-app/features/state/actions/dsw-actions.actions';
import {
  DSW_DASHBOARD_CLOSE,
  DSW_DASHBOARD_GET_NODES_SUCCESS,
  DSW_DASHBOARD_INIT
} from '@rufe-app/features/nodes/dashboard/dsw-dashboard.actions';
import {
  DSW_BOOTSTRAP_CLOSE,
  DSW_BOOTSTRAP_GET_NODES_SUCCESS,
  DSW_BOOTSTRAP_INIT
} from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.actions';
import { DSW_LIVE_CLOSE, DSW_LIVE_GET_NODES_SUCCESS, DSW_LIVE_INIT } from '@rufe-app/features/nodes/live/dsw-live.actions';
import {
  DSW_WORK_POOL_CLOSE,
  DSW_WORK_POOL_GET_WORK_POOL_DETAIL,
  DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS,
  DSW_WORK_POOL_GET_WORK_POOL_SUCCESS,
  DSW_WORK_POOL_INIT,
} from '@rufe-snarks/work-pool/dsw-work-pool.actions';

export type LoadingState = string[];

const initialState: LoadingState = [];

export function reducer(state: LoadingState = initialState, action: FeatureAction<any>): LoadingState {
  switch (action.type) {
    /* ------------ ADD ------------ */
    case APP_INIT:

    case DSW_ACTIONS_GET_EARLIEST_SLOT:
    case DSW_ACTIONS_GET_ACTIONS:
    case DSW_DASHBOARD_INIT:
    case DSW_BOOTSTRAP_INIT:
    case DSW_LIVE_INIT:
    case DSW_WORK_POOL_INIT:
    case DSW_WORK_POOL_GET_WORK_POOL_DETAIL:
      return add(state, action);

    /* ------------ REMOVE ------------ */
    case APP_INIT_SUCCESS:
      return remove(state, APP_INIT);

    case DSW_ACTIONS_GET_EARLIEST_SLOT_SUCCESS:
      return remove(state, DSW_ACTIONS_GET_EARLIEST_SLOT);
    case DSW_ACTIONS_GET_ACTIONS_SUCCESS:
      return remove(state, DSW_ACTIONS_GET_ACTIONS);
    case DSW_ACTIONS_CLOSE:
      return remove(state, [DSW_ACTIONS_GET_EARLIEST_SLOT, DSW_ACTIONS_GET_ACTIONS]);

    case DSW_DASHBOARD_GET_NODES_SUCCESS:
      return remove(state, DSW_DASHBOARD_INIT);
    case DSW_DASHBOARD_CLOSE:
      return remove(state, [DSW_DASHBOARD_INIT]);
    case DSW_BOOTSTRAP_GET_NODES_SUCCESS:
      return remove(state, DSW_BOOTSTRAP_INIT);
    case DSW_BOOTSTRAP_CLOSE:
      return remove(state, [DSW_BOOTSTRAP_INIT]);
    case DSW_LIVE_GET_NODES_SUCCESS:
      return remove(state, DSW_LIVE_INIT);
    case DSW_LIVE_CLOSE:
      return remove(state, [DSW_LIVE_INIT]);
    case DSW_WORK_POOL_GET_WORK_POOL_SUCCESS:
      return remove(state, DSW_WORK_POOL_INIT);
    case DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS:
      return remove(state, DSW_WORK_POOL_GET_WORK_POOL_DETAIL);
    case DSW_WORK_POOL_CLOSE:
      return remove(state, [DSW_WORK_POOL_INIT, DSW_WORK_POOL_GET_WORK_POOL_DETAIL]);
    default:
      return state;
  }
}

function add(state: LoadingState, action: FeatureAction<any>): LoadingState {
  return [action.type, ...state];
}

function remove(state: LoadingState, type: string | string[]): LoadingState {
  if (Array.isArray(type)) {
    return state.filter(t => !type.includes(t));
  }
  return state.filter(t => t !== type);
}

export const selectLoadingStateLength = (state: MinaState): number => state.loading.length;
