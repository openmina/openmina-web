import { BenchmarksTransactionsState } from '@ocfe-benchmarks/transactions/benchmarks-transactions.state';
import { sort, SortDirection, TableSort } from '@openmina/shared';
import {
  BENCHMARKS_TRANSACTIONS_CLOSE,
  BENCHMARKS_TRANSACTIONS_GET_TRANSACTIONS_SUCCESS,
  BENCHMARKS_TRANSACTIONS_SORT,
  BenchmarksTransactionsActions,
} from '@ocfe-benchmarks/transactions/benchmarks-transactions.actions';
import { BenchmarksTransaction } from '@ocfe-shared/types/benchmarks/transactions/benchmarks-transaction.type';

const initialState: BenchmarksTransactionsState = {
  transactions: [],
  sort: {
    sortBy: 'from',
    sortDirection: SortDirection.DSC,
  },
};

export function reducer(state: BenchmarksTransactionsState = initialState, action: BenchmarksTransactionsActions): BenchmarksTransactionsState {
  switch (action.type) {

    case BENCHMARKS_TRANSACTIONS_GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactions: sortTxs(action.payload, state.sort),
      };
    }

    case BENCHMARKS_TRANSACTIONS_SORT: {
      return {
        ...state,
        sort: action.payload,
        transactions: sortTxs(state.transactions, action.payload),
      };
    }

    case BENCHMARKS_TRANSACTIONS_CLOSE:
      return initialState;

    default:
      return state;
  }
}

function sortTxs(txs: BenchmarksTransaction[], tableSort: TableSort<BenchmarksTransaction>): BenchmarksTransaction[] {
  return sort<BenchmarksTransaction>(txs, tableSort, ['date', 'to', 'memo', 'from', 'validUntil']);
}
