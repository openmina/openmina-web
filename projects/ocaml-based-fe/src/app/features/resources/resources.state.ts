import { SystemResourcesState } from '@ocfe-resources/system/system-resources.state';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';

export interface ResourcesState {
  systemResources: SystemResourcesState;
}

const select = <T>(selector: (state: ResourcesState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectResourcesState,
  selector,
);

export const selectResourcesState = createFeatureSelector<ResourcesState>('resources');
export const selectSystemResourcesState = select((state: ResourcesState): SystemResourcesState => state.systemResources);
