import { isDesktop, sort, SortDirection, TableSort, toggleItem } from '@openmina/shared';
import { DswWorkPoolState } from '@rufe-snarks/work-pool/dsw-work-pool.state';
import {
  DSW_WORK_POOL_CLOSE,
  DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS,
  DSW_WORK_POOL_GET_WORK_POOL_SUCCESS,
  DSW_WORK_POOL_SET_ACTIVE_WORK_POOL,
  DSW_WORK_POOL_SORT_WORK_POOL,
  DSW_WORK_POOL_TOGGLE_FILTER,
  DSW_WORK_POOL_TOGGLE_SIDE_PANEL,
  DswWorkPoolActions,
} from '@rufe-snarks/work-pool/dsw-work-pool.actions';
import { WorkPool } from '@rufe-shared/types/snarks/work-pool/work-pool.type';

const initialState: DswWorkPoolState = {
  workPools: [],
  filteredWorkPools: [],
  activeWorkPool: undefined,
  openSidePanel: isDesktop(),
  sort: {
    sortBy: 'timestamp',
    sortDirection: SortDirection.DSC,
  },
  filters: [],
  activeWorkPoolSpecs: undefined,
  activeWorkPoolDetail: undefined,
};

export function reducer(state: DswWorkPoolState = initialState, action: DswWorkPoolActions): DswWorkPoolState {
  switch (action.type) {

    case DSW_WORK_POOL_GET_WORK_POOL_SUCCESS: {
      let workPools = sortWorkPools(action.payload, state.sort);
      return {
        ...state,
        workPools: workPools,
        filteredWorkPools: workPools,
      };
    }

    case DSW_WORK_POOL_SET_ACTIVE_WORK_POOL: {
      return {
        ...state,
        openSidePanel: true,
        activeWorkPool: state.workPools.find(w => w.id === action.payload.id),
        activeWorkPoolSpecs: undefined,
      };
    }

    case DSW_WORK_POOL_SORT_WORK_POOL: {
      return {
        ...state,
        sort: action.payload,
        filteredWorkPools: filterWorkPools(sortWorkPools(state.workPools, action.payload), state.filters),
      };
    }

    case DSW_WORK_POOL_TOGGLE_SIDE_PANEL: {
      return {
        ...state,
        openSidePanel: !state.openSidePanel,
        activeWorkPool: undefined,
      };
    }

    case DSW_WORK_POOL_TOGGLE_FILTER: {
      const filters = toggleItem(state.filters, action.payload);
      return {
        ...state,
        filters,
        filteredWorkPools: filterWorkPools(state.workPools, filters),
      };
    }

    case DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS: {
      return {
        ...state,
        activeWorkPoolSpecs: action.payload[0],
        activeWorkPoolDetail: action.payload[1],
      };
    }

    case DSW_WORK_POOL_CLOSE:
      return initialState;

    default:
      return state;
  }
}

function filterWorkPools(workPools: WorkPool[], filters: string[]): WorkPool[] {
  if (filters.length === 0) {
    return workPools;
  }
  if (filters.includes('local')) {
    return workPools.filter(workPool => workPool.snarkOrigin === 'Local' || workPool.commitmentOrigin === 'Local');
  }
  if (filters.includes('remote')) {
    return workPools.filter(workPool => workPool.snarkOrigin === 'Remote' || workPool.commitmentOrigin === 'Remote');
  }
  throw Error('Unknown filter');
}

function sortWorkPools(events: WorkPool[], tableSort: TableSort<WorkPool>): WorkPool[] {
  return sort<WorkPool>(events, tableSort, ['id', 'snarkOrigin', 'commitmentOrigin']);
}
