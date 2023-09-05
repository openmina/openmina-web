import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromBuilds from '@cife-reporting/builds/reporting-builds.reducer';
import * as fromCompare from '@cife-reporting/compare/reporting-compare.reducer';
import * as fromDashboard from '@cife-reporting/dashboard/reporting-dashboard.reducer';
import { ReportingState } from '@cife-reporting/reporting.state';
import { ReportingBuildsAction, ReportingBuildsActions } from '@cife-reporting/builds/reporting-builds.actions';
import { ReportingCompareAction, ReportingCompareActions } from '@cife-reporting/compare/reporting-compare.actions';
import { ReportingDashboardAction, ReportingDashboardActions } from '@cife-reporting/dashboard/reporting-dashboard.actions';

export type ReportingActions =
  & ReportingBuildsActions
  & ReportingCompareActions
  & ReportingDashboardActions
  ;
export type ReportingAction =
  & ReportingBuildsAction
  & ReportingCompareAction
  & ReportingDashboardAction
  ;

export const reducer: ActionReducer<ReportingState, ReportingActions> = combineReducers<ReportingState, ReportingActions>({
  builds: fromBuilds.reducer,
  compare: fromCompare.reducer,
  dashboard: fromDashboard.reducer,
});
