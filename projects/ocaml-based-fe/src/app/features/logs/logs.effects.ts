import { Injectable } from '@angular/core';
import { MinaOcamlBaseEffect } from '@ocfe-shared/base-classes/mina-ocaml-base.effect';
import { LOGS_GET_LOGS, LOGS_GET_LOGS_SUCCESS, LogsActions } from '@ocfe-logs/logs.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@ocfe-app/app.setup';
import { catchError, map, repeat, switchMap } from 'rxjs';
import { addError } from '@ocfe-shared/constants/store-functions';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';
import { LogsService } from '@ocfe-logs/logs.service';
import { Log } from '@ocfe-shared/types/logs/log.type';
import { Effect } from '@openmina/shared';

@Injectable({
  providedIn: 'root',
})
export class LogsEffects extends MinaOcamlBaseEffect<LogsActions> {

  readonly getLogs$: Effect;

  constructor(private actions$: Actions,
              private logsService: LogsService,
              store: Store<MinaState>) {

    super(store, selectMinaState);

    this.getLogs$ = createEffect(() => this.actions$.pipe(
      ofType(LOGS_GET_LOGS),
      switchMap(() => this.logsService.getLogs()),
      map((payload: Log[]) => ({ type: LOGS_GET_LOGS_SUCCESS, payload })),
      catchError((error: Error) => [
        addError(error, MinaErrorType.GRAPH_QL),
        { type: LOGS_GET_LOGS_SUCCESS, payload: [] },
      ]),
      repeat(),
    ));

  }
}
