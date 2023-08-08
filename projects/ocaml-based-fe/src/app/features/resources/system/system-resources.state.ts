import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { selectSystemResourcesState } from '@ocfe-resources/resources.state';
import { SystemResourcesChartData } from '@ocfe-shared/types/resources/system/system-resources-chart-data.type';
import { SystemResourcesColorMapping } from '@ocfe-shared/types/resources/system/system-resources-color-mapping.type';
import { SystemResourcesActivePoint } from '@ocfe-shared/types/resources/system/system-resources-active-point.type';
import { TableSort } from '@ocfe-shared/types/shared/table-sort.type';
import { SystemResourcesPointThread } from '@ocfe-shared/types/resources/system/system-resources-sub-point.type';

export interface SystemResourcesState {
  chartData: SystemResourcesChartData;
  sidePanelOpen: boolean;
  colorMapping: SystemResourcesColorMapping;
  activePoint: SystemResourcesActivePoint;
  activeTime: number;
  activeResource: string;
  threadsSort: TableSort<SystemResourcesPointThread>;
  sidePanelActivePath: string;
  redrawCharts: boolean;
}


const select = <T>(selector: (state: SystemResourcesState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectSystemResourcesState,
  selector,
);

export const selectSystemResourcesColorMapping = select((state: SystemResourcesState): SystemResourcesColorMapping => state.colorMapping);
export const selectSystemResourcesActivePoint = select((state: SystemResourcesState): SystemResourcesActivePoint => state.activePoint);
export const selectSystemResourcesData = select((state: SystemResourcesState): SystemResourcesChartData => state.chartData);
export const selectSystemResourcesThreadSort = select((state: SystemResourcesState): TableSort<SystemResourcesPointThread> => state.threadsSort);
export const selectSystemResourcesSidePanelActivePath = select((state: SystemResourcesState): string => state.sidePanelActivePath);
export const selectSystemResourcesSidePanel = select((state: SystemResourcesState): boolean => state.sidePanelOpen);
export const selectSystemResourcesRedrawCharts = select((state: SystemResourcesState): boolean => state.redrawCharts);
