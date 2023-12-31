import { FeatureAction, TableSort } from '@openmina/shared';
import { DswDashboardNode } from '@rufe-shared/types/nodes/dashboard/dsw-dashboard-node.type';

enum DswDashboardActionTypes {
  DSW_DASHBOARD_INIT = 'DSW_DASHBOARD_INIT',
  DSW_DASHBOARD_GET_NODES = 'DSW_DASHBOARD_GET_NODES',
  DSW_DASHBOARD_GET_NODES_SUCCESS = 'DSW_DASHBOARD_GET_NODES_SUCCESS',
  DSW_DASHBOARD_TOGGLE_SIDE_PANEL = 'DSW_DASHBOARD_TOGGLE_SIDE_PANEL',
  DSW_DASHBOARD_SORT_NODES = 'DSW_DASHBOARD_SORT_NODES',
  DSW_DASHBOARD_SET_ACTIVE_NODE = 'DSW_DASHBOARD_SET_ACTIVE_NODE',
  DSW_DASHBOARD_CLOSE = 'DSW_DASHBOARD_CLOSE',
}

export const DSW_DASHBOARD_INIT = DswDashboardActionTypes.DSW_DASHBOARD_INIT;
export const DSW_DASHBOARD_GET_NODES = DswDashboardActionTypes.DSW_DASHBOARD_GET_NODES;
export const DSW_DASHBOARD_GET_NODES_SUCCESS = DswDashboardActionTypes.DSW_DASHBOARD_GET_NODES_SUCCESS;
export const DSW_DASHBOARD_SORT_NODES = DswDashboardActionTypes.DSW_DASHBOARD_SORT_NODES;
export const DSW_DASHBOARD_SET_ACTIVE_NODE = DswDashboardActionTypes.DSW_DASHBOARD_SET_ACTIVE_NODE;
export const DSW_DASHBOARD_CLOSE = DswDashboardActionTypes.DSW_DASHBOARD_CLOSE;

export interface DswDashboardAction extends FeatureAction<DswDashboardActionTypes> {
  readonly type: DswDashboardActionTypes;
}

export class DswDashboardInit implements DswDashboardAction {
  readonly type = DSW_DASHBOARD_INIT;
}

export class DswDashboardGetNodes implements DswDashboardAction {
  readonly type = DSW_DASHBOARD_GET_NODES;
}

export class DswDashboardGetNodesSuccess implements DswDashboardAction {
  readonly type = DSW_DASHBOARD_GET_NODES_SUCCESS;

  constructor(public payload: DswDashboardNode[]) { }
}

export class DswDashboardSortNodes implements DswDashboardAction {
  readonly type = DSW_DASHBOARD_SORT_NODES;

  constructor(public payload: TableSort<DswDashboardNode>) { }
}

export class DswDashboardSetActiveNode implements DswDashboardAction {
  readonly type = DSW_DASHBOARD_SET_ACTIVE_NODE;

  constructor(public payload: DswDashboardNode) { }
}

export class DswDashboardClose implements DswDashboardAction {
  readonly type = DSW_DASHBOARD_CLOSE;
}

export type DswDashboardActions =
  | DswDashboardInit
  | DswDashboardGetNodes
  | DswDashboardGetNodesSuccess
  | DswDashboardSortNodes
  | DswDashboardSetActiveNode
  | DswDashboardClose
  ;
