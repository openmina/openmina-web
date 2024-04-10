import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@cife-app/app.setup';
import { Report } from '@cife-shared/types/reporting/report.type';
import { ReportDetail } from '@cife-shared/types/reporting/report-detail.type';
import { ReportDetailBlock } from '@cife-shared/types/reporting/report-detail-block.type';
import { ReportDetailBlockPeerTiming } from '@cife-shared/types/reporting/report-detail-block-peer-timing.type';
import { ReportGraphConfig } from '@cife-shared/types/reporting/report-graph-config.type';
import { selectReportingBuildsState } from '@cife-reporting/reporting.state';
import { TableSort } from '@openmina/shared';

export interface ReportingBuildsState {
  reports: Report[];
  activeReport: Report;
  activeReportDetail: ReportDetail;
  idToShow: number;
  blockSort: TableSort<ReportDetailBlock>;
  activeBlock: ReportDetailBlock;
  peerSort: TableSort<ReportDetailBlockPeerTiming>;
  activeFilters: string[];
  graphConfig: ReportGraphConfig;
  delta: boolean;
}

const select = <T>(selector: (state: ReportingBuildsState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectReportingBuildsState,
  selector,
);

export const selectReportingBuildsReports = select((state: ReportingBuildsState): Report[] => state.reports);
export const selectReportingBuildsActiveReport = select((state: ReportingBuildsState): Report => state.activeReport);
export const selectReportingBuildsActiveReportDetailBlocks = select((state: ReportingBuildsState): ReportDetailBlock[] => state.activeReportDetail.blocks);
export const selectReportingBuildsBlockSort = select((state: ReportingBuildsState): TableSort<ReportDetailBlock> => state.blockSort);
export const selectReportingBuildsActiveBlock = select((state: ReportingBuildsState): ReportDetailBlock => state.activeBlock);
export const selectReportingBuildsPeerSort = select((state: ReportingBuildsState): TableSort<ReportDetailBlockPeerTiming> => state.peerSort);
export const selectReportingBuildsActiveFilters = select((state: ReportingBuildsState): string[] => state.activeFilters);
export const selectReportingBuildsGraphConfig = select((state: ReportingBuildsState): ReportGraphConfig => state.graphConfig);
export const selectReportingBuildsDelta = select((state: ReportingBuildsState): boolean => state.delta);
