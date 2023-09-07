import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromErrorPreview from '@fufe-error-preview/error-preview.reducer';
import { ErrorPreviewAction } from '@fufe-error-preview/error-preview.actions';
import { ErrorPreviewState } from '@fufe-error-preview/error-preview.state';

import * as fromApp from '@fufe-app/app.reducer';
import { AppAction } from '@fufe-app/app.actions';
import { AppState } from '@fufe-app/app.state';

import * as fromFuzzing from '@fufe-fuzzing/fuzzing.reducer';
import { FuzzingAction } from '@fufe-fuzzing/fuzzing.actions';
import { FuzzingState } from '@fufe-fuzzing/fuzzing.state';

import { routerReducer } from '@ngrx/router-store';
import { MergedRouteReducerState } from '@fufe-shared/router/merged-route';


export interface MinaState {
  app: AppState;
  error: ErrorPreviewState;
  fuzzing: FuzzingState;
  router: MergedRouteReducerState;
}

type MinaAction =
  & AppAction
  & ErrorPreviewAction
  & FuzzingAction
  ;

export const reducers: ActionReducerMap<MinaState, MinaAction> = {
  app: fromApp.reducer,
  error: fromErrorPreview.reducer,
  fuzzing: fromFuzzing.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<MinaState, MinaAction>[] = [];

export const selectMinaState = (state: MinaState): MinaState => state;
