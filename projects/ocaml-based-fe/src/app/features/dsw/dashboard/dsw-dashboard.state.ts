import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { selectDswDashboardState } from '@ocfe-dsw/dsw.state';
import { DswDashboardNode } from '@ocfe-shared/types/dsw/dashboard/dsw-dashboard-node.type';
import { TableSort } from '@openmina/shared';

export interface DswDashboardState {
  nodes: DswDashboardNode[];
  activeNode: DswDashboardNode;
  sort: TableSort<DswDashboardNode>;
}

const select = <T>(selector: (state: DswDashboardState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectDswDashboardState,
  selector,
);

export const selectDswDashboardNodes = select((state: DswDashboardState): DswDashboardNode[] => state.nodes);
export const selectDswDashboardSort = select((state: DswDashboardState): TableSort<DswDashboardNode> => state.sort);
export const selectDswDashboardActiveNode = select((state: DswDashboardState): DswDashboardNode => state.activeNode);
