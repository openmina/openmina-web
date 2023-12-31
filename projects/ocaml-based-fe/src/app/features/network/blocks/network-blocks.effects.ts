import { Injectable } from '@angular/core';
import { MinaState, selectMinaState } from '@ocfe-app/app.setup';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MinaOcamlBaseEffect } from '@ocfe-shared/base-classes/mina-ocaml-base.effect';
import { createNonDispatchableEffect, Effect, NonDispatchableEffect } from '@openmina/shared';
import { filter, map, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { catchErrorAndRepeat } from '@ocfe-shared/constants/store-functions';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';
import {
  NETWORK_BLOCKS_CLOSE,
  NETWORK_BLOCKS_GET_BLOCKS,
  NETWORK_BLOCKS_GET_BLOCKS_SUCCESS,
  NETWORK_BLOCKS_GET_EARLIEST_BLOCK,
  NETWORK_BLOCKS_INIT,
  NETWORK_BLOCKS_SET_ACTIVE_BLOCK,
  NETWORK_BLOCKS_SET_EARLIEST_BLOCK,
  NetworkBlocksActions,
  NetworkBlocksGetBlocks,
  NetworkBlocksGetEarliestBlock,
  NetworkBlocksSetActiveBlock,
} from '@ocfe-network/blocks/network-blocks.actions';
import { NetworkBlocksService } from '@ocfe-network/blocks/network-blocks.service';
import { NetworkBlock } from '@ocfe-shared/types/network/blocks/network-block.type';
import { Store } from '@ngrx/store';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { Router } from '@angular/router';
import { NetworkBlocksState } from '@ocfe-network/blocks/network-blocks.state';

@Injectable({
  providedIn: 'root',
})
export class NetworkBlocksEffects extends MinaOcamlBaseEffect<NetworkBlocksActions> {

  readonly init$: Effect;
  readonly earliestBlock$: Effect;
  readonly getBlocks$: Effect;
  readonly setActiveBlock$: Effect;
  readonly close$: NonDispatchableEffect;

  private networkDestroy$: Subject<void> = new Subject<void>();
  private streamActive: boolean;
  private waitingForServer: boolean;

  constructor(private router: Router,
              private actions$: Actions,
              private networkBlocksService: NetworkBlocksService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.earliestBlock$ = createEffect(() => this.actions$.pipe(
      ofType(NETWORK_BLOCKS_GET_EARLIEST_BLOCK),
      this.latestStateSlice<NetworkBlocksState, NetworkBlocksGetEarliestBlock>('network.blocks'),
      switchMap((state: NetworkBlocksState) =>
        this.networkBlocksService.getEarliestBlockHeight().pipe(
          switchMap(height => {
            const actions: NetworkBlocksActions[] = [{ type: NETWORK_BLOCKS_SET_EARLIEST_BLOCK, payload: { height } }];
            if (!state.activeBlock) {
              this.router.navigate([Routes.NETWORK, Routes.BLOCKS, height ?? ''], { queryParamsHandling: 'merge' });
              actions.push({ type: NETWORK_BLOCKS_SET_ACTIVE_BLOCK, payload: { height } });
              actions.push({ type: NETWORK_BLOCKS_INIT });
            }
            return actions;
          }),
        ),
      ),
      catchErrorAndRepeat(MinaErrorType.DEBUGGER, NETWORK_BLOCKS_SET_EARLIEST_BLOCK, {}),
    ));

    this.init$ = createEffect(() => this.actions$.pipe(
      ofType(NETWORK_BLOCKS_INIT),
      switchMap(() =>
        timer(0, 5000).pipe(
          takeUntil(this.networkDestroy$),
          filter(() => !this.waitingForServer),
          map(() => ({ type: NETWORK_BLOCKS_GET_BLOCKS })),
        ),
      ),
    ));

    this.getBlocks$ = createEffect(() => this.actions$.pipe(
      ofType(NETWORK_BLOCKS_GET_BLOCKS),
      this.latestActionState<NetworkBlocksGetBlocks>(),
      tap(({ state }) => this.streamActive = state.network.blocks.stream),
      tap(() => this.waitingForServer = true),
      switchMap(({ action, state }) => this.networkBlocksService.getBlockMessages(action.payload?.height || state.network.blocks.activeBlock)),
      tap(() => this.waitingForServer = false),
      map((payload: NetworkBlock[]) => ({ type: NETWORK_BLOCKS_GET_BLOCKS_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.DEBUGGER, NETWORK_BLOCKS_GET_BLOCKS_SUCCESS, []),
    ));

    this.setActiveBlock$ = createEffect(() => this.actions$.pipe(
      ofType(NETWORK_BLOCKS_SET_ACTIVE_BLOCK),
      this.latestActionState<NetworkBlocksSetActiveBlock>(),
      filter(({ action }) => action.payload.fetchNew),
      map(({ action }) => ({ type: NETWORK_BLOCKS_GET_BLOCKS, payload: { height: action.payload.height } })),
    ));

    this.close$ = createNonDispatchableEffect(() => this.actions$.pipe(
      ofType(NETWORK_BLOCKS_CLOSE),
      tap(() => {
        this.streamActive = false;
        this.networkDestroy$.next(null);
      }),
    ));
  }
}
