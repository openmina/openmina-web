import { FeatureAction } from '@openmina/shared';

enum DashboardActionTypes {
  DASHBOARD_INIT = 'DASHBOARD_INIT',
  DASHBOARD_CLOSE = 'DASHBOARD_CLOSE',
}

export const DASHBOARD_INIT = DashboardActionTypes.DASHBOARD_INIT;
export const DASHBOARD_CLOSE = DashboardActionTypes.DASHBOARD_CLOSE;

export interface DashboardAction extends FeatureAction<DashboardActionTypes> {
  readonly type: DashboardActionTypes;
}

export class DashboardInit implements DashboardAction {
  readonly type = DASHBOARD_INIT;
}

export class DashboardClose implements DashboardAction {
  readonly type = DASHBOARD_CLOSE;
}

export type DashboardActions =
  | DashboardInit
  | DashboardClose
  ;
