import { Injectable } from '@angular/core';
import { Effect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@rufe-app/app.setup';
import { EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { catchErrorAndRepeat } from '@rufe-shared/constants/store-functions';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';
import { DswLiveService } from '@rufe-app/features/nodes/live/dsw-live.service';
import {
  DSW_LIVE_CLOSE,
  DSW_LIVE_GET_NODES,
  DSW_LIVE_GET_NODES_SUCCESS,
  DswLiveActions,
  DswLiveClose,
  DswLiveGetNodes
} from '@rufe-app/features/nodes/live/dsw-live.actions';
import { DswLiveNode } from '@rufe-shared/types/dsw/live/dsw-live-node.type';
import { MinaRustBaseEffect } from '@rufe-shared/base-classes/mina-rust-base.effect';

@Injectable({
  providedIn: 'root',
})
export class DswLiveEffects extends MinaRustBaseEffect<DswLiveActions> {

  readonly getNodes$: Effect;

  private pendingRequest: boolean;

  constructor(private actions$: Actions,
              private dswLiveService: DswLiveService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getNodes$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_LIVE_GET_NODES, DSW_LIVE_CLOSE),
      this.latestActionState<DswLiveGetNodes | DswLiveClose>(),
      filter(({ action }) => (action as any).payload?.force || !this.pendingRequest),
      tap(({ action }) => {
        if (action.type === DSW_LIVE_GET_NODES) {
          this.pendingRequest = true;
        }
      }),
      switchMap(({ action }) =>
        action.type === DSW_LIVE_CLOSE
          ? EMPTY
          : this.dswLiveService.getLiveNodeTips(),
      ),
      map((payload: DswLiveNode[]) => ({ type: DSW_LIVE_GET_NODES_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_LIVE_GET_NODES_SUCCESS, { blocks: [], events: [] }),
      tap(() => this.pendingRequest = false),
    ));
  }
}
