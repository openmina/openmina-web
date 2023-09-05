import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@cife-app/app.setup';
import { Report } from '@cife-shared/types/reporting/report.type';
import { ReportDetail } from '@cife-shared/types/reporting/report-detail.type';
import { ReportDetailBlock } from '@cife-shared/types/reporting/report-detail-block.type';
import { ReportDetailBlockPeerTiming } from '@cife-shared/types/reporting/report-detail-block-peer-timing.type';
import { ReportGraphConfig } from '@cife-shared/types/reporting/report-graph-config.type';
import { selectReportingDashboardState } from '@cife-reporting/reporting.state';
import { TableSort } from '@openmina/shared';

export interface ReportingDashboardState {
  reports: Report[];
  activeReport: Report;
  activeReportDetail: ReportDetail;
  idToShow: number;
  blockSort: TableSort<ReportDetailBlock>;
  activeBlock: ReportDetailBlock;
  peerSort: TableSort<ReportDetailBlockPeerTiming>;
  activeFilters: string[];
  graphConfig: ReportGraphConfig;
}

const select = <T>(selector: (state: ReportingDashboardState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectReportingDashboardState,
  selector,
);

export const selectReportingDashboardReports = select((state: ReportingDashboardState): Report[] => state.reports);
export const selectReportingDashboardActiveReport = select((state: ReportingDashboardState): Report => state.activeReport);
export const selectReportingDashboardActiveReportDetailBlocks = select((state: ReportingDashboardState): ReportDetailBlock[] => state.activeReportDetail.blocks);
export const selectReportingDashboardBlockSort = select((state: ReportingDashboardState): TableSort<ReportDetailBlock> => state.blockSort);
export const selectReportingDashboardActiveBlock = select((state: ReportingDashboardState): ReportDetailBlock => state.activeBlock);
export const selectReportingDashboardPeerSort = select((state: ReportingDashboardState): TableSort<ReportDetailBlockPeerTiming> => state.peerSort);
export const selectReportingDashboardActiveFilters = select((state: ReportingDashboardState): string[] => state.activeFilters);
export const selectReportingDashboardGraphConfig = select((state: ReportingDashboardState): ReportGraphConfig => state.graphConfig);
