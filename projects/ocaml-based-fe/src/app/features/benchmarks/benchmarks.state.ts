import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { BenchmarksWalletsState } from '@ocfe-benchmarks/wallets/benchmarks-wallets.state';
import { BenchmarksTransactionsState } from '@ocfe-benchmarks/transactions/benchmarks-transactions.state';

export interface BenchmarksState {
  wallets: BenchmarksWalletsState;
  transactions: BenchmarksTransactionsState;
}

const select = <T>(selector: (state: BenchmarksState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectBenchmarksState,
  selector,
);

export const selectBenchmarksState = createFeatureSelector<BenchmarksState>('benchmarks');
export const selectBenchmarksWalletsState = select((state: BenchmarksState): BenchmarksWalletsState => state.wallets);
export const selectBenchmarksTransactionsState = select((state: BenchmarksState): BenchmarksTransactionsState => state.transactions);
