import { Injectable } from '@angular/core';
import { Effect, hasValue } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@rufe-app/app.setup';
import { EMPTY, filter, forkJoin, map, switchMap, tap } from 'rxjs';
import { catchErrorAndRepeat } from '@rufe-shared/constants/store-functions';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';
import {
  DSW_WORK_POOL_CLOSE,
  DSW_WORK_POOL_GET_WORK_POOL,
  DSW_WORK_POOL_GET_WORK_POOL_DETAIL,
  DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS,
  DSW_WORK_POOL_GET_WORK_POOL_SUCCESS,
  DSW_WORK_POOL_SET_ACTIVE_WORK_POOL,
  DswWorkPoolActions,
  DswWorkPoolClose,
  DswWorkPoolGetWorkPool,
  DswWorkPoolGetWorkPoolDetail,
  DswWorkPoolSetActiveWorkPool,
} from '@rufe-snarks/work-pool/dsw-work-pool.actions';
import { DswWorkPoolService } from '@rufe-snarks/work-pool/dsw-work-pool.service';
import { WorkPool } from '@rufe-shared/types/snarks/work-pool/work-pool.type';
import { WorkPoolSpecs } from '@rufe-shared/types/snarks/work-pool/work-pool-specs.type';
import { WorkPoolDetail } from '@rufe-shared/types/snarks/work-pool/work-pool-detail.type';
import { MinaRustBaseEffect } from '@rufe-shared/base-classes/mina-rust-base.effect';

@Injectable({
  providedIn: 'root',
})
export class DswWorkPoolEffects extends MinaRustBaseEffect<DswWorkPoolActions> {

  readonly getWorkPool$: Effect;
  readonly selectActiveWorkPool$: Effect;
  readonly getActiveWorkPoolDetail$: Effect;

  private pendingRequest: boolean;

  constructor(private actions$: Actions,
              private dswWorkPoolService: DswWorkPoolService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getWorkPool$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_WORK_POOL_GET_WORK_POOL, DSW_WORK_POOL_CLOSE),
      this.latestActionState<DswWorkPoolGetWorkPool | DswWorkPoolClose>(),
      filter(({ action }) => {
        return (action.type === DSW_WORK_POOL_GET_WORK_POOL && !this.pendingRequest) || action.type === DSW_WORK_POOL_CLOSE;
      }),
      tap(({ action }) => {
        if (action.type === DSW_WORK_POOL_GET_WORK_POOL) {
          this.pendingRequest = true;
        }
      }),
      switchMap(({ action, state }) =>
        action.type === DSW_WORK_POOL_CLOSE
          ? EMPTY
          : this.dswWorkPoolService.getWorkPool(),
      ),
      map((payload: WorkPool[]) => ({ type: DSW_WORK_POOL_GET_WORK_POOL_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_WORK_POOL_GET_WORK_POOL_SUCCESS, []),
      tap(() => this.pendingRequest = false),
    ));

    this.selectActiveWorkPool$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_WORK_POOL_SET_ACTIVE_WORK_POOL),
      this.latestActionState<DswWorkPoolSetActiveWorkPool>(),
      filter(({ action }) => hasValue(action.payload?.id)),
      map(({ action }) => ({ type: DSW_WORK_POOL_GET_WORK_POOL_DETAIL, payload: action.payload })),
    ));

    this.getActiveWorkPoolDetail$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_WORK_POOL_GET_WORK_POOL_DETAIL, DSW_WORK_POOL_CLOSE),
      this.latestActionState<DswWorkPoolGetWorkPoolDetail | DswWorkPoolClose>(),
      filter(({ action }) => hasValue((action as DswWorkPoolGetWorkPoolDetail).payload?.id)),
      switchMap(({ action, state }) =>
        action.type === DSW_WORK_POOL_CLOSE
          ? EMPTY
          : forkJoin([
            this.dswWorkPoolService.getWorkPoolSpecs(state.snarks.workPool.activeWorkPool.id),
            this.dswWorkPoolService.getWorkPoolDetail(state.snarks.workPool.activeWorkPool.id),
          ]),
      ),
      map((payload: [WorkPoolSpecs, WorkPoolDetail]) => ({
        type: DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS,
        payload
      })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_WORK_POOL_GET_WORK_POOL_DETAIL_SUCCESS),
    ));
  }
}
