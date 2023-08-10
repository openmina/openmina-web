import { isMobile, sort, SortDirection, TableSort } from '@openmina/shared';
import { DswFrontierState } from '@ocfe-dsw/frontier/dsw-frontier.state';
import {
  DSW_FRONTIER_CLOSE,
  DSW_FRONTIER_GET_LOGS_SUCCESS,
  DSW_FRONTIER_SET_ACTIVE_LOG,
  DSW_FRONTIER_SORT_LOGS,
  DSW_FRONTIER_TOGGLE_SIDE_PANEL,
  DswFrontierActions,
} from '@ocfe-dsw/frontier/dsw-frontier.actions';
import { DswFrontierLog } from '@ocfe-shared/types/dsw/frontier/dsw-frontier-log.type';

const initialState: DswFrontierState = {
  logs: [],
  activeLog: undefined,
  openSidePanel: !isMobile(),
  sort: {
    sortBy: 'date',
    sortDirection: SortDirection.DSC,
  },
};

export function reducer(state: DswFrontierState = initialState, action: DswFrontierActions): DswFrontierState {
  switch (action.type) {

    case DSW_FRONTIER_GET_LOGS_SUCCESS: {
      return {
        ...state,
        logs: sortLogs(action.payload, state.sort),
      };
    }

    case DSW_FRONTIER_SORT_LOGS: {
      return {
        ...state,
        sort: action.payload,
        logs: sortLogs(state.logs, action.payload),
      };
    }

    case DSW_FRONTIER_SET_ACTIVE_LOG: {
      return {
        ...state,
        activeLog: action.payload,
      };
    }

    case DSW_FRONTIER_TOGGLE_SIDE_PANEL: {
      return {
        ...state,
        openSidePanel: !state.openSidePanel,
      };
    }

    case DSW_FRONTIER_CLOSE:
      return initialState;

    default:
      return state;
  }
}

function sortLogs(node: DswFrontierLog[], tableSort: TableSort<DswFrontierLog>): DswFrontierLog[] {
  return sort<DswFrontierLog>(node, tableSort, ['date', 'level', 'message']);
}
