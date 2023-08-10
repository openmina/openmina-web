import { sort, SortDirection, TableSort } from '@openmina/shared';
import { DswBootstrapState } from '@ocfe-dsw/bootstrap/dsw-bootstrap.state';
import {
  DSW_BOOTSTRAP_CLOSE,
  DSW_BOOTSTRAP_GET_NODES_SUCCESS,
  DSW_BOOTSTRAP_SET_ACTIVE_BLOCK,
  DSW_BOOTSTRAP_SORT_NODES,
  DSW_BOOTSTRAP_TOGGLE_SIDE_PANEL,
  DswBootstrapActions,
} from '@ocfe-dsw/bootstrap/dsw-bootstrap.actions';
import { DswBootstrapNode } from '@ocfe-shared/types/dsw/bootstrap/dsw-bootstrap-node.type';
import { isDesktop } from '@openmina/shared';

const initialState: DswBootstrapState = {
  nodes: [],
  activeNode: undefined,
  openSidePanel: isDesktop(),
  sort: {
    sortBy: 'index',
    sortDirection: SortDirection.ASC,
  },
};

export function reducer(state: DswBootstrapState = initialState, action: DswBootstrapActions): DswBootstrapState {
  switch (action.type) {

    case DSW_BOOTSTRAP_GET_NODES_SUCCESS: {
      return {
        ...state,
        nodes: sortNodes(action.payload, state.sort),
        activeNode: state.activeNode ? action.payload.find(node => node.index === state.activeNode.index) : undefined,
      };
    }

    case DSW_BOOTSTRAP_SET_ACTIVE_BLOCK: {
      return {
        ...state,
        activeNode: action.payload,
        openSidePanel: action.payload ? true : state.openSidePanel,
      };
    }

    case DSW_BOOTSTRAP_SORT_NODES: {
      return {
        ...state,
        sort: action.payload,
        nodes: sortNodes(state.nodes, action.payload),
      };
    }

    case DSW_BOOTSTRAP_TOGGLE_SIDE_PANEL: {
      return {
        ...state,
        openSidePanel: !state.openSidePanel,
        activeNode: state.openSidePanel ? undefined : state.activeNode,
      };
    }

    case DSW_BOOTSTRAP_CLOSE:
      return initialState;

    default:
      return state;
  }
}

function sortNodes(node: DswBootstrapNode[], tableSort: TableSort<DswBootstrapNode>): DswBootstrapNode[] {
  return sort<DswBootstrapNode>(node, tableSort, ['bestTip']);
}
