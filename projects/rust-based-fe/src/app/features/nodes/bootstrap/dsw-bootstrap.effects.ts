import { Injectable } from '@angular/core';
import { Effect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@rufe-app/app.setup';
import { EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { catchErrorAndRepeat } from '@rufe-shared/constants/store-functions';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';
import {
  DSW_BOOTSTRAP_CLOSE,
  DSW_BOOTSTRAP_GET_NODES,
  DSW_BOOTSTRAP_GET_NODES_SUCCESS,
  DswBootstrapActions,
  DswBootstrapClose,
  DswBootstrapGetNodes,
} from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.actions';
import { DswBootstrapService } from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.service';
import { DswBootstrapNode } from '@rufe-shared/types/dsw/bootstrap/dsw-bootstrap-node.type';
import { MinaRustBaseEffect } from '@rufe-shared/base-classes/mina-rust-base.effect';

@Injectable({
  providedIn: 'root',
})
export class DswBootstrapEffects extends MinaRustBaseEffect<DswBootstrapActions> {

  readonly getNodes$: Effect;

  private pendingRequest: boolean;

  constructor(private actions$: Actions,
              private dswBootstrapService: DswBootstrapService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getNodes$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_BOOTSTRAP_GET_NODES, DSW_BOOTSTRAP_CLOSE),
      this.latestActionState<DswBootstrapGetNodes | DswBootstrapClose>(),
      filter(({ action }) => (action as any).payload?.force || !this.pendingRequest),
      tap(({ action }) => {
        if (action.type === DSW_BOOTSTRAP_GET_NODES) {
          this.pendingRequest = true;
        }
      }),
      switchMap(({ action, state }) =>
        action.type === DSW_BOOTSTRAP_CLOSE
          ? EMPTY
          : this.dswBootstrapService.getBootstrapNodeTips(),
      ),
      map((payload: DswBootstrapNode[]) => ({ type: DSW_BOOTSTRAP_GET_NODES_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_BOOTSTRAP_GET_NODES_SUCCESS, { blocks: [] }),
      tap(() => this.pendingRequest = false),
    ));
  }
}
