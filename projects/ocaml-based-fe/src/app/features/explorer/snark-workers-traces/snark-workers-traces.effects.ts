import { Injectable } from '@angular/core';
import { MinaBaseEffect } from '@ocfe-shared/base-classes/mina-base.effect';
import { Effect } from '@ocfe-shared/types/store/effect.type';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@ocfe-app/app.setup';
import { EMPTY, map, switchMap } from 'rxjs';
import { catchErrorAndRepeat } from '@ocfe-shared/constants/store-functions';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';
import {
  SW_TRACES_CLOSE,
  SW_TRACES_GET_WORKERS_SUCCESS,
  SW_TRACES_INIT,
  SWTracesActions,
  SWTracesClose,
  SWTracesInit,
} from '@ocfe-explorer/snark-workers-traces/snark-workers-traces.actions';
import { SnarkWorkersTracesService } from '@ocfe-explorer/snark-workers-traces/snark-workers-traces.service';

@Injectable({
  providedIn: 'root',
})
export class SnarkWorkersTracesEffects extends MinaBaseEffect<SWTracesActions> {

  readonly getWorkers$: Effect;

  constructor(private actions$: Actions,
              private snarksService: SnarkWorkersTracesService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getWorkers$ = createEffect(() => this.actions$.pipe(
      ofType(SW_TRACES_INIT, SW_TRACES_CLOSE),
      this.latestActionState<SWTracesInit | SWTracesClose>(),
      switchMap(({ action }) =>
        action.type === SW_TRACES_CLOSE
          ? EMPTY
          : this.snarksService.getWorkers(),
      ),
      map((payload: string[]) => ({ type: SW_TRACES_GET_WORKERS_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, SW_TRACES_GET_WORKERS_SUCCESS, []),
    ));
  }
}
