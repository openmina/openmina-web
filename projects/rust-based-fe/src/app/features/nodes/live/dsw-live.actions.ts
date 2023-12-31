import { FeatureAction, TableSort } from '@openmina/shared';
import { DswLiveNode } from '@rufe-shared/types/nodes/live/dsw-live-node.type';
import { DswLiveBlockEvent } from '@rufe-shared/types/nodes/live/dsw-live-block-event.type';

enum DswLiveActionTypes {
  DSW_LIVE_INIT = 'DSW_LIVE_INIT',
  DSW_LIVE_GET_NODES = 'DSW_LIVE_GET_NODES',
  DSW_LIVE_GET_NODES_SUCCESS = 'DSW_LIVE_GET_NODES_SUCCESS',
  DSW_LIVE_SORT_EVENTS = 'DSW_LIVE_SORT_EVENTS',
  DSW_LIVE_SET_ACTIVE_NODE = 'DSW_LIVE_SET_ACTIVE_NODE',
  DSW_LIVE_TOGGLE_SIDE_PANEL = 'DSW_LIVE_TOGGLE_SIDE_PANEL',
  DSW_LIVE_TOGGLE_FILTER = 'DSW_LIVE_TOGGLE_FILTER',
  DSW_LIVE_CLOSE = 'DSW_LIVE_CLOSE',
}

export const DSW_LIVE_INIT = DswLiveActionTypes.DSW_LIVE_INIT;
export const DSW_LIVE_GET_NODES = DswLiveActionTypes.DSW_LIVE_GET_NODES;
export const DSW_LIVE_GET_NODES_SUCCESS = DswLiveActionTypes.DSW_LIVE_GET_NODES_SUCCESS;
export const DSW_LIVE_SORT_EVENTS = DswLiveActionTypes.DSW_LIVE_SORT_EVENTS;
export const DSW_LIVE_SET_ACTIVE_NODE = DswLiveActionTypes.DSW_LIVE_SET_ACTIVE_NODE;
export const DSW_LIVE_TOGGLE_SIDE_PANEL = DswLiveActionTypes.DSW_LIVE_TOGGLE_SIDE_PANEL;
export const DSW_LIVE_TOGGLE_FILTER = DswLiveActionTypes.DSW_LIVE_TOGGLE_FILTER;
export const DSW_LIVE_CLOSE = DswLiveActionTypes.DSW_LIVE_CLOSE;

export interface DswLiveAction extends FeatureAction<DswLiveActionTypes> {
  readonly type: DswLiveActionTypes;
}

export class DswLiveInit implements DswLiveAction {
  readonly type = DSW_LIVE_INIT;
}

export class DswLiveGetNodes implements DswLiveAction {
  readonly type = DSW_LIVE_GET_NODES;

  constructor(public payload?: { force?: boolean }) { }
}

export class DswLiveGetNodesSuccess implements DswLiveAction {
  readonly type = DSW_LIVE_GET_NODES_SUCCESS;

  constructor(public payload: DswLiveNode[]) { }
}

export class DswLiveSortEvents implements DswLiveAction {
  readonly type = DSW_LIVE_SORT_EVENTS;

  constructor(public payload: TableSort<DswLiveBlockEvent>) { }
}

export class DswLiveSetActiveNode implements DswLiveAction {
  readonly type = DSW_LIVE_SET_ACTIVE_NODE;

  constructor(public payload: { hash: string }) { }
}

export class DswLiveToggleSidePanel implements DswLiveAction {
  readonly type = DSW_LIVE_TOGGLE_SIDE_PANEL;
}

export class DswLiveToggleFilter implements DswLiveAction {
  readonly type = DSW_LIVE_TOGGLE_FILTER;

  constructor(public payload: string) { }
}

export class DswLiveClose implements DswLiveAction {
  readonly type = DSW_LIVE_CLOSE;
}

export type DswLiveActions =
  | DswLiveInit
  | DswLiveGetNodes
  | DswLiveGetNodesSuccess
  | DswLiveSortEvents
  | DswLiveSetActiveNode
  | DswLiveToggleSidePanel
  | DswLiveToggleFilter
  | DswLiveClose
  ;
