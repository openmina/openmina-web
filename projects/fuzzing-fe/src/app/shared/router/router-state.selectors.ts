import { createFeatureSelector, createSelector } from '@ngrx/store';
import { routerStateConfig } from '@fufe-shared/router/ngrx-router.module';
import { MergedRoute, MergedRouteReducerState } from '@fufe-shared/router/merged-route';

const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);

export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState: MergedRouteReducerState): MergedRoute => routerReducerState?.state);
