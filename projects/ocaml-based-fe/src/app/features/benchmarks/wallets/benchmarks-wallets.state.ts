import { BenchmarksWallet } from '@ocfe-shared/types/benchmarks/wallets/benchmarks-wallet.type';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { SentTransactionsStats } from '@ocfe-shared/types/benchmarks/wallets/sent-transactions-stats.type';
import { BenchmarksMempoolTx } from '@ocfe-shared/types/benchmarks/wallets/benchmarks-mempool-tx.type';
import { BenchmarksWalletTransaction } from '@ocfe-shared/types/benchmarks/wallets/benchmarks-wallet-transaction.type';
import { selectBenchmarksWalletsState } from '@ocfe-benchmarks/benchmarks.state';


export interface BenchmarksWalletsState {
  wallets: BenchmarksWallet[];
  blockSending: boolean;
  txSendingBatch: number;
  sentTransactions: SentTransactionsStats;
  sentTxCount: number;
  mempoolTxs: BenchmarksMempoolTx[];
  txsToSend: BenchmarksWalletTransaction[];
  randomWallet: boolean;
  activeWallet: BenchmarksWallet;
  sendingFee: number;
}

const select = <T>(selector: (state: BenchmarksWalletsState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectBenchmarksWalletsState,
  selector,
);

export const selectBenchmarksWallets = select((state: BenchmarksWalletsState): BenchmarksWallet[] => state.wallets);
export const selectBenchmarksBlockSending = select((state: BenchmarksWalletsState): boolean => state.blockSending || state.txsToSend.length > 0);
export const selectBenchmarksSentTransactionsStats = select((state: BenchmarksWalletsState): SentTransactionsStats => state.sentTransactions);
export const selectBenchmarksSendingBatch = select((state: BenchmarksWalletsState): number => state.txSendingBatch);
export const selectBenchmarksSendingFee = select((state: BenchmarksWalletsState): number => state.sendingFee);
export const selectBenchmarksRandomWallet = select((state: BenchmarksWalletsState): boolean => state.randomWallet);
export const selectBenchmarksActiveWallet = select((state: BenchmarksWalletsState): BenchmarksWallet => state.activeWallet);
