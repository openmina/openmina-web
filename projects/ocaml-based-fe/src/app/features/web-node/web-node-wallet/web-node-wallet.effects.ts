import { Injectable } from '@angular/core';
import { MinaOcamlBaseEffect } from '@ocfe-shared/base-classes/mina-ocaml-base.effect';
import { any, createNonDispatchableEffect, Effect, NonDispatchableEffect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@ocfe-app/app.setup';
import { filter, map, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import {
  WEB_NODE_WALLET_CLOSE,
  WEB_NODE_WALLET_CREATE_TRANSACTION,
  WEB_NODE_WALLET_GET_TRANSACTIONS,
  WEB_NODE_WALLET_GET_TRANSACTIONS_STATUSES_SUCCESS,
  WEB_NODE_WALLET_GET_TRANSACTIONS_SUCCESS,
  WEB_NODE_WALLET_GET_WALLETS,
  WEB_NODE_WALLET_GET_WALLETS_SUCCESS,
  WebNodeWalletActions,
  WebNodeWalletCreateTransaction,
  WebNodeWalletGetTransactions,
  WebNodeWalletGetTransactionsSuccess,
} from '@ocfe-web-node/web-node-wallet/web-node-wallet.actions';
import { WebNodeWalletService } from '@ocfe-web-node/web-node-wallet/web-node-wallet.service';
import { WebNodeWallet } from '@ocfe-shared/types/web-node/wallet/web-node-wallet.type';
import { WebNodeTransaction } from '@ocfe-shared/types/web-node/wallet/web-node-transaction.type';
import { addError, catchErrorAndRepeat } from '@ocfe-shared/constants/store-functions';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebNodeWalletEffects extends MinaOcamlBaseEffect<WebNodeWalletActions> {

  readonly walletInit$: Effect;
  readonly getWallets$: Effect;
  readonly getTransactions$: Effect;
  readonly createTransaction$: NonDispatchableEffect;
  readonly getTransactionsSuccess$: Effect;
  readonly close$: NonDispatchableEffect;

  private readonly walletDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions,
              private webNodeWalletService: WebNodeWalletService,
              store: Store<MinaState>) {

    super(store, selectMinaState);

    this.walletInit$ = createEffect(() => this.actions$.pipe(
      ofType(WEB_NODE_WALLET_GET_WALLETS),
      switchMap(({ action, state }) =>
        timer(0, 100000).pipe(
          takeUntil(this.walletDestroy$),
          map(() => ({ type: WEB_NODE_WALLET_GET_TRANSACTIONS })),
        ),
      ),
    ));

    this.getWallets$ = createEffect(() => this.actions$.pipe(
      ofType(WEB_NODE_WALLET_GET_WALLETS),
      switchMap(() => this.webNodeWalletService.getWallets()),
      switchMap((result: Array<WebNodeWallet | HttpErrorResponse>) => {
        const actions: any[] = [
          { type: WEB_NODE_WALLET_GET_WALLETS_SUCCESS, payload: result.filter((w: WebNodeWallet | HttpErrorResponse) => any(w).publicKey) },
        ];
        const errors = result.filter((w: WebNodeWallet | HttpErrorResponse) => !any(w).publicKey) as HttpErrorResponse[];
        if (errors.length > 0) {
          actions.push(
            ...errors.map((w: HttpErrorResponse) => addError(w, MinaErrorType.MINA_EXPLORER)),
          );
        }
        return actions;
      }),
    ));

    this.createTransaction$ = createNonDispatchableEffect(() => this.actions$.pipe(
      ofType(WEB_NODE_WALLET_CREATE_TRANSACTION),
      this.latestActionState<WebNodeWalletCreateTransaction>(),
      switchMap(({ action }) => this.webNodeWalletService.createTransaction(action.payload)),
      tap((payload: string) => console.log('transaction:', payload)),
    ));

    this.getTransactions$ = createEffect(() => this.actions$.pipe(
      ofType(WEB_NODE_WALLET_GET_TRANSACTIONS),
      this.latestActionState<WebNodeWalletGetTransactions>(),
      filter(({ state }) => !!state.webNode.wallet.activeWallet),
      switchMap(({ state }) => this.webNodeWalletService.getTransactions(state.webNode.wallet.activeWallet.publicKey)),
      map((payload: WebNodeTransaction[]) => ({ type: WEB_NODE_WALLET_GET_TRANSACTIONS_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.WEB_NODE, WEB_NODE_WALLET_GET_TRANSACTIONS_SUCCESS, [])
    ));

    this.getTransactionsSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(WEB_NODE_WALLET_GET_TRANSACTIONS_SUCCESS),
      this.latestActionState<WebNodeWalletGetTransactionsSuccess>(),
      switchMap(({ state }) => this.webNodeWalletService.getTransactionStatuses(state.webNode.wallet.transactions.filter(t => t.isInMempool).map(t => t.id))),
      map((payload: { [id: string]: string }) => ({ type: WEB_NODE_WALLET_GET_TRANSACTIONS_STATUSES_SUCCESS, payload })),
    ));

    this.close$ = createNonDispatchableEffect(() => this.actions$.pipe(
      ofType(WEB_NODE_WALLET_CLOSE),
      tap(() => this.walletDestroy$.next(null)),
    ));
  }
}
