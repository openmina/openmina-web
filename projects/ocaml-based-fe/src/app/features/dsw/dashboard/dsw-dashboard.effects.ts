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
  DSW_DASHBOARD_CLOSE,
  DSW_DASHBOARD_GET_NODES,
  DSW_DASHBOARD_GET_NODES_SUCCESS,
  DswDashboardActions,
  DswDashboardClose,
  DswDashboardGetNodes,
} from '@ocfe-dsw/dashboard/dsw-dashboard.actions';
import { DswDashboardService } from '@ocfe-dsw/dashboard/dsw-dashboard.service';
import { DswDashboardNode } from '@ocfe-shared/types/dsw/dashboard/dsw-dashboard-node.type';

@Injectable({
  providedIn: 'root',
})
export class DswDashboardEffects extends MinaOcamlBaseEffect<DswDashboardActions> {

  readonly getNodes$: Effect;

  private pendingRequest: boolean;

  constructor(private actions$: Actions,
              private dswDashboardService: DswDashboardService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getNodes$ = createEffect(() => this.actions$.pipe(
      ofType(DSW_DASHBOARD_GET_NODES, DSW_DASHBOARD_CLOSE),
      this.latestActionState<DswDashboardGetNodes | DswDashboardClose>(),
      filter(() => !this.pendingRequest),
      tap(({ action }) => {
        if (action.type === DSW_DASHBOARD_GET_NODES) {
          this.pendingRequest = true;
        }
      }),
      switchMap(({ action, state }) =>
        action.type === DSW_DASHBOARD_CLOSE
          ? EMPTY
          : this.dswDashboardService.getNodes(),
      ),
      map((payload: DswDashboardNode[]) => ({ type: DSW_DASHBOARD_GET_NODES_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, DSW_DASHBOARD_GET_NODES_SUCCESS, []),
      tap(() => this.pendingRequest = false),
    ));
  }
}
