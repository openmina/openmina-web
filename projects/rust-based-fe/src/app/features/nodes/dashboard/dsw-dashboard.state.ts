import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';
import { DswDashboardNode } from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-node.type';
import { TableSort } from '@openmina/shared';
import { selectNodesDashboardState } from '@rufe-nodes/nodes.state';

export interface DswDashboardState {
  nodes: DswDashboardNode[];
  activeNode: DswDashboardNode;
  sort: TableSort<DswDashboardNode>;
}

const select = <T>(selector: (state: DswDashboardState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectNodesDashboardState,
  selector,
);

export const selectDswDashboardNodes = select((state: DswDashboardState): DswDashboardNode[] => state.nodes);
export const selectDswDashboardSort = select((state: DswDashboardState): TableSort<DswDashboardNode> => state.sort);
export const selectDswDashboardActiveNode = select((state: DswDashboardState): DswDashboardNode => state.activeNode);
