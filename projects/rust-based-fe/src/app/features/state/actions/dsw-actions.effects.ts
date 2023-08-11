import { Injectable } from '@angular/core';
import { Effect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@rufe-app/app.setup';
import { EMPTY, map, switchMap } from 'rxjs';
import { catchErrorAndRepeat } from '@rufe-shared/constants/store-functions';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';
import { DswActionsService } from '@rufe-state/actions/dsw-actions.service';
import {
  DSW_ACTIONS_CLOSE,
  DSW_ACTIONS_GET_ACTIONS,
  DSW_ACTIONS_GET_ACTIONS_SUCCESS,
  DSW_ACTIONS_GET_EARLIEST_SLOT,
  DSW_ACTIONS_GET_EARLIEST_SLOT_SUCCESS,
  DswActionsActions,
  DswActionsClose,
  DswActionsGetActions,
  DswActionsGetEarliestSlot,
} from '@rufe-state/actions/dsw-actions.actions';
import { DswActionGroup } from '@rufe-shared/types/dsw/actions/dsw-action-group.type';
import { DswActionsStats } from '@rufe-shared/types/dsw/actions/dsw-actions-stats.type';
import { Routes } from '@rufe-shared/enums/routes.enum';
import { Router } from '@angular/router';
import { MinaRustBaseEffect } from '@rufe-shared/base-classes/mina-rust-base.effect';

@Injectable({
  providedIn: 'root',
})
export class DswActionsEffects extends MinaRustBaseEffect<DswActionsActions> {

  readonly getActions$: Effect;
  readonly getEarliestSlot$: Effect;

  constructor(private router: Router,
              private actions$: Actions,
              private actionsService: DswActionsService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getEarliestSlot$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_ACTIONS_GET_EARLIEST_SLOT, DSW_ACTIONS_CLOSE),
      this.latestActionState<DswActionsGetEarliestSlot | DswActionsClose>(),
      switchMap(({ action, state }) =>
        action.type === DSW_ACTIONS_CLOSE
          ? EMPTY
          : this.actionsService.getEarliestSlot().pipe(
            switchMap((payload: number) => {
              const actions: DswActionsActions[] = [{ type: DSW_ACTIONS_GET_EARLIEST_SLOT_SUCCESS, payload }];
              if (state.state.actions.activeSlot === undefined || state.state.actions.activeSlot > payload) {
                this.router.navigate([Routes.STATE, Routes.ACTIONS, payload ?? ''], { queryParamsHandling: 'merge' });
                actions.push({ type: DSW_ACTIONS_GET_ACTIONS, payload: { slot: payload } });
              }
              return actions;
            }),
          ),
      ),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_ACTIONS_GET_EARLIEST_SLOT_SUCCESS, null),
    ));

    this.getActions$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_ACTIONS_GET_ACTIONS, DSW_ACTIONS_CLOSE),
      this.latestActionState<DswActionsGetActions | DswActionsClose>(),
      switchMap(({ action, state }) =>
        action.type === DSW_ACTIONS_CLOSE
          ? EMPTY
          : this.actionsService.getActions(state.state.actions.activeSlot),
      ),
      map((payload: [DswActionsStats, DswActionGroup[]]) => ({ type: DSW_ACTIONS_GET_ACTIONS_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_ACTIONS_GET_ACTIONS_SUCCESS, []),
    ));
  }
}
