import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { selectDswBootstrapState, selectDswDashboardState } from '@ocfe-dsw/dsw.state';
import { DswDashboardNode } from '@ocfe-shared/types/dsw/dashboard/dsw-dashboard-node.type';
import { TableSort } from '@ocfe-shared/types/shared/table-sort.type';
import { DswDashboardBlock } from '@ocfe-shared/types/dsw/dashboard/dsw-dashboard-block.type';
import { DswBootstrapNode } from '@ocfe-shared/types/dsw/bootstrap/dsw-bootstrap-node.type';

export interface DswBootstrapState {
  nodes: DswBootstrapNode[];
  activeNode: DswBootstrapNode;
  sort: TableSort<DswBootstrapNode>;
  openSidePanel: boolean;
}

const select = <T>(selector: (state: DswBootstrapState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectDswBootstrapState,
  selector,
);

export const selectDswBootstrapNodes = select((state: DswBootstrapState): DswBootstrapNode[] => state.nodes);
export const selectDswBootstrapSort = select((state: DswBootstrapState): TableSort<DswBootstrapNode> => state.sort);
export const selectDswBootstrapActiveNode = select((state: DswBootstrapState): DswBootstrapNode => state.activeNode);
export const selectDswBootstrapOpenSidePanel = select((state: DswBootstrapState): boolean => state.openSidePanel);
