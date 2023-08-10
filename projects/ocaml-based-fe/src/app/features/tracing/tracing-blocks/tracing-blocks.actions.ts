import { FeatureAction, TableSort } from '@openmina/shared';
import { TracingBlockTrace } from '@ocfe-shared/types/tracing/blocks/tracing-block-trace.type';
import { TracingTraceGroup } from '@ocfe-shared/types/tracing/blocks/tracing-trace-group.type';

enum TracingBlocksActionTypes {
  TRACING_BLOCKS_INIT = 'TRACING_BLOCKS_INIT',
  TRACING_BLOCKS_CLOSE = 'TRACING_BLOCKS_CLOSE',
  TRACING_BLOCKS_GET_TRACES = 'TRACING_BLOCKS_GET_TRACES',
  TRACING_BLOCKS_GET_TRACES_SUCCESS = 'TRACING_BLOCKS_GET_TRACES_SUCCESS',
  TRACING_BLOCKS_SELECT_ROW = 'TRACING_BLOCKS_SELECT_ROW',
  TRACING_BLOCKS_GET_DETAILS = 'TRACING_BLOCKS_GET_DETAILS',
  TRACING_BLOCKS_GET_DETAILS_SUCCESS = 'TRACING_BLOCKS_GET_DETAILS_SUCCESS',
  TRACING_BLOCKS_SORT = 'TRACING_BLOCKS_SORT',
}

export const TRACING_BLOCKS_INIT = TracingBlocksActionTypes.TRACING_BLOCKS_INIT;
export const TRACING_BLOCKS_CLOSE = TracingBlocksActionTypes.TRACING_BLOCKS_CLOSE;
export const TRACING_BLOCKS_GET_TRACES = TracingBlocksActionTypes.TRACING_BLOCKS_GET_TRACES;
export const TRACING_BLOCKS_GET_TRACES_SUCCESS = TracingBlocksActionTypes.TRACING_BLOCKS_GET_TRACES_SUCCESS;
export const TRACING_BLOCKS_SELECT_ROW = TracingBlocksActionTypes.TRACING_BLOCKS_SELECT_ROW;
export const TRACING_BLOCKS_GET_DETAILS = TracingBlocksActionTypes.TRACING_BLOCKS_GET_DETAILS;
export const TRACING_BLOCKS_GET_DETAILS_SUCCESS = TracingBlocksActionTypes.TRACING_BLOCKS_GET_DETAILS_SUCCESS;
export const TRACING_BLOCKS_SORT = TracingBlocksActionTypes.TRACING_BLOCKS_SORT;

export interface TracingBlocksAction extends FeatureAction<TracingBlocksActionTypes> {
  readonly type: TracingBlocksActionTypes;
}

export class TracingBlocksInit implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_INIT;
}

export class TracingBlocksClose implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_CLOSE;
}

export class TracingBlocksGetTraces implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_GET_TRACES;
}

export class TracingBlocksGetTracesSuccess implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_GET_TRACES_SUCCESS;

  constructor(public payload: TracingBlockTrace[]) { }
}

export class TracingBlocksSelectRow implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_SELECT_ROW;

  constructor(public payload: TracingBlockTrace) { }
}

export class TracingBlocksGetDetails implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_GET_DETAILS;
}

export class TracingBlocksGetDetailsSuccess implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_GET_DETAILS_SUCCESS;

  constructor(public payload: TracingTraceGroup[]) { }
}

export class TracingBlocksSort implements TracingBlocksAction {
  readonly type = TRACING_BLOCKS_SORT;

  constructor(public payload: TableSort<TracingBlockTrace>) { }
}

export type TracingBlocksActions =
  | TracingBlocksInit
  | TracingBlocksClose
  | TracingBlocksGetTraces
  | TracingBlocksGetTracesSuccess
  | TracingBlocksSelectRow
  | TracingBlocksGetDetails
  | TracingBlocksGetDetailsSuccess
  | TracingBlocksSort
  ;
