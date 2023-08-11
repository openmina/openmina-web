import { Injectable } from '@angular/core';
import { Effect, MinaBaseEffect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@rufe-app/app.setup';
import { EMPTY, map, switchMap } from 'rxjs';
import { catchErrorAndRepeat } from '@rufe-shared/constants/store-functions';
import { DswFrontierService } from '@rufe-snarks/frontier/dsw-frontier.service';
import {
  DSW_FRONTIER_CLOSE,
  DSW_FRONTIER_GET_LOGS,
  DSW_FRONTIER_GET_LOGS_SUCCESS,
  DswFrontierActions,
  DswFrontierClose,
  DswFrontierGetLogs,
} from '@rufe-snarks/frontier/dsw-frontier.actions';
import { DswFrontierLog } from '@rufe-shared/types/dsw/frontier/dsw-frontier-log.type';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';

@Injectable({
  providedIn: 'root',
})
export class DswFrontierEffects extends MinaBaseEffect<DswFrontierActions, MinaState> {

  readonly getLogs$: Effect;

  constructor(private actions$: Actions,
              private dswFrontierService: DswFrontierService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    //TODO: add to loading bar
    this.getLogs$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_FRONTIER_GET_LOGS, DSW_FRONTIER_CLOSE),
      this.latestActionState<DswFrontierGetLogs | DswFrontierClose>(),
      switchMap(({ action, state }) =>
        action.type === DSW_FRONTIER_CLOSE
          ? EMPTY
          : this.dswFrontierService.getDswFrontierLogs(),
      ),
      map((payload: DswFrontierLog[]) => ({ type: DSW_FRONTIER_GET_LOGS_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_FRONTIER_GET_LOGS_SUCCESS, []),
    ));
  }
}
