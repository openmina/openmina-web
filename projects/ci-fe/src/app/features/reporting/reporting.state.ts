import { ReportingBuildsState } from '@cife-reporting/builds/reporting-builds.state';
import { MinaState } from '@cife-app/app.setup';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ReportingCompareState } from '@cife-reporting/compare/reporting-compare.state';
import { ReportingDashboardState } from '@cife-reporting/dashboard/reporting-dashboard.state';

export interface ReportingState {
  builds: ReportingBuildsState;
  compare: ReportingCompareState;
  dashboard: ReportingDashboardState;
}

const select = <T>(selector: (state: ReportingState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectReportingState,
  selector,
);

export const selectReportingState = createFeatureSelector<ReportingState>('reporting');
export const selectReportingBuildsState = select((state: ReportingState): ReportingBuildsState => state.builds);
export const selectReportingCompareState = select((state: ReportingState): ReportingCompareState => state.compare);
export const selectReportingDashboardState = select((state: ReportingState): ReportingDashboardState => state.dashboard);
