import { Injectable } from '@angular/core';
import { MinaOcamlBaseEffect } from '@ocfe-shared/base-classes/mina-ocaml-base.effect';
import { Effect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@ocfe-app/app.setup';
import { EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { catchErrorAndRepeat } from '@ocfe-shared/constants/store-functions';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';
import {
  DSW_BOOTSTRAP_CLOSE,
  DSW_BOOTSTRAP_GET_NODES,
  DSW_BOOTSTRAP_GET_NODES_SUCCESS,
  DswBootstrapActions,
  DswBootstrapClose,
  DswBootstrapGetNodes,
} from '@ocfe-dsw/bootstrap/dsw-bootstrap.actions';
import { DswBootstrapService } from '@ocfe-dsw/bootstrap/dsw-bootstrap.service';
import { DswBootstrapNode } from '@ocfe-shared/types/dsw/bootstrap/dsw-bootstrap-node.type';

@Injectable({
  providedIn: 'root',
})
export class DswBootstrapEffects extends MinaOcamlBaseEffect<DswBootstrapActions> {

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
