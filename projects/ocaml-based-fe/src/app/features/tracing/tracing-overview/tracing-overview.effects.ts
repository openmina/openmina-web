import { Injectable } from '@angular/core';
import { MinaOcamlBaseEffect } from '@ocfe-shared/base-classes/mina-ocaml-base.effect';
import { Effect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@ocfe-app/app.setup';
import { TracingOverviewService } from '@ocfe-tracing/tracing-overview/tracing-overview.service';
import {
  TRACING_OVERVIEW_CLOSE,
  TRACING_OVERVIEW_GET_CHECKPOINTS,
  TRACING_OVERVIEW_GET_CHECKPOINTS_SUCCESS,
  TracingOverviewActions,
  TracingOverviewClose,
  TracingOverviewGetCheckpoints,
} from '@ocfe-tracing/tracing-overview/tracing-overview.actions';
import { EMPTY, map, switchMap } from 'rxjs';
import { TracingOverviewCheckpoint } from '@ocfe-shared/types/tracing/overview/tracing-overview-checkpoint.type';
import { catchErrorAndRepeat } from '@ocfe-shared/constants/store-functions';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';

@Injectable({
  providedIn: 'root',
})
export class TracingOverviewEffects extends MinaOcamlBaseEffect<TracingOverviewActions> {

  readonly getCheckpoints$: Effect;

  constructor(private actions$: Actions,
              private tracingOverviewService: TracingOverviewService,
              store: Store<MinaState>) {

    super(store, selectMinaState);

    this.getCheckpoints$ = createEffect(() => this.actions$.pipe(
      ofType(TRACING_OVERVIEW_GET_CHECKPOINTS, TRACING_OVERVIEW_CLOSE),
      this.latestActionState<TracingOverviewGetCheckpoints | TracingOverviewClose>(),
      switchMap(({ action }) =>
        action.type === TRACING_OVERVIEW_CLOSE
          ? EMPTY
          : this.tracingOverviewService.getStatistics(),
      ),
      map((payload: TracingOverviewCheckpoint[]) => ({ type: TRACING_OVERVIEW_GET_CHECKPOINTS_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GRAPH_QL, TRACING_OVERVIEW_GET_CHECKPOINTS_SUCCESS, []),
    ));
  }
}
