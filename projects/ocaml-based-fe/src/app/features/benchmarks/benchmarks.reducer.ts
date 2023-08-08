import { BenchmarksState } from '@ocfe-benchmarks/benchmarks.state';
import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromWallets from '@ocfe-benchmarks/wallets/benchmarks-wallets.reducer';
import { BenchmarksWalletsAction, BenchmarksWalletsActions } from '@ocfe-benchmarks/wallets/benchmarks-wallets.actions';

import * as fromTransactions from '@ocfe-benchmarks/transactions/benchmarks-transactions.reducer';
import { BenchmarksTransactionsAction, BenchmarksTransactionsActions } from '@ocfe-benchmarks/transactions/benchmarks-transactions.actions';

export type BenchmarksActions =
  & BenchmarksWalletsActions
  & BenchmarksTransactionsActions
export type BenchmarksAction =
  & BenchmarksWalletsAction
  & BenchmarksTransactionsAction

export const reducer: ActionReducer<BenchmarksState, BenchmarksActions> = combineReducers<BenchmarksState, BenchmarksActions>({
  wallets: fromWallets.reducer,
  transactions: fromTransactions.reducer,
});
