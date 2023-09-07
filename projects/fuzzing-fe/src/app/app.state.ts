import { MinaState } from '@fufe-app/app.setup';
import { AppMenu } from '@fufe-shared/types/app/app-menu.type';
import { createSelector, MemoizedSelector } from '@ngrx/store';

export interface AppState {
  subMenus: string[];
  menu: AppMenu;
}

const select = <T>(selector: (state: AppState) => T): MinaSelector<T> => createSelector(
  selectAppState,
  selector,
);

type MinaSelector<T> = MemoizedSelector<MinaState, T>;

export const selectAppState = (state: MinaState): AppState => state.app;
export const selectAppMenu = select((state: AppState): AppMenu => state.menu);
export const selectAppSubMenus = select((state: AppState): string[] => state.subMenus);
