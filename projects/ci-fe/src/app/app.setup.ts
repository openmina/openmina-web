import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromReporting from '@cife-reporting/reporting.reducer';
import { ReportingAction } from '@cife-reporting/reporting.reducer';
import { ReportingState } from '@cife-reporting/reporting.state';
import { AppState } from '@cife-app/app.state';
import { AppAction } from '@cife-app/app.actions';
import * as fromApp from '@cife-app/app.reducer';
import { ErrorPreviewState } from '@cife-error-preview/error-preview.state';
import { ErrorPreviewAction } from '@cife-error-preview/error-preview.actions';
import * as fromErrorPreview from '@cife-error-preview/error-preview.reducer';
import { routerReducer } from '@ngrx/router-store';

export interface MinaState {
  reporting: ReportingState;
  app: AppState;
  error: ErrorPreviewState;
  router: any;
}

type MinaAction =
  & AppAction
  & ErrorPreviewAction
  & ReportingAction
  ;

export const reducers: ActionReducerMap<MinaState, MinaAction> = {
  reporting: fromReporting.reducer,
  app: fromApp.reducer,
  error: fromErrorPreview.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<MinaState, MinaAction>[] = [];

export const selectMinaState = (state: MinaState): MinaState => state;
