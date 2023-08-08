import { combineReducers } from '@ngrx/store';
import { ResourcesState } from '@ocfe-resources/resources.state';
import { SystemResourcesAction, SystemResourcesActions } from '@ocfe-resources/system/system-resources.actions';
import * as fromSystemResources from '@ocfe-system-resources/system-resources.reducer';

export type ResourcesActions = SystemResourcesActions;
export type ResourcesAction = SystemResourcesAction;

export const reducer = combineReducers<ResourcesState, ResourcesActions>({
  systemResources: fromSystemResources.reducer,
});
