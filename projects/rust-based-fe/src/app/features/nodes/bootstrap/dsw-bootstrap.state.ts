import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';
import { TableSort } from '@openmina/shared';
import { DswBootstrapNode } from '@rufe-shared/types/dsw/bootstrap/dsw-bootstrap-node.type';
import { selectNodesBootstrapState } from '@rufe-nodes/nodes.state';

export interface DswBootstrapState {
  nodes: DswBootstrapNode[];
  activeNode: DswBootstrapNode;
  sort: TableSort<DswBootstrapNode>;
  openSidePanel: boolean;
}

const select = <T>(selector: (state: DswBootstrapState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectNodesBootstrapState,
  selector,
);

export const selectDswBootstrapNodes = select((state: DswBootstrapState): DswBootstrapNode[] => state.nodes);
export const selectDswBootstrapSort = select((state: DswBootstrapState): TableSort<DswBootstrapNode> => state.sort);
export const selectDswBootstrapActiveNode = select((state: DswBootstrapState): DswBootstrapNode => state.activeNode);
export const selectDswBootstrapOpenSidePanel = select((state: DswBootstrapState): boolean => state.openSidePanel);
