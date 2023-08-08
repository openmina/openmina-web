import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromBlocks from '@ocfe-explorer/blocks/explorer-blocks.reducer';
import * as fromTxs from '@ocfe-explorer/transactions/explorer-transactions.reducer';
import * as fromSnarks from '@ocfe-explorer/snarks/explorer-snarks.reducer';
import * as fromScanState from '@ocfe-explorer/scan-state/explorer-scan-state.reducer';
import * as fromSnarkTraces from '@ocfe-explorer/snark-workers-traces/snark-workers-traces.reducer';
import { ExplorerBlocksAction, ExplorerBlocksActions } from '@ocfe-explorer/blocks/explorer-blocks.actions';
import { ExplorerState } from '@ocfe-explorer/explorer.state';
import { ExplorerTransactionsAction, ExplorerTransactionsActions } from '@ocfe-explorer/transactions/explorer-transactions.actions';
import { ExplorerSnarksAction, ExplorerSnarksActions } from '@ocfe-explorer/snarks/explorer-snarks.actions';
import { ExplorerScanStateAction, ExplorerScanStateActions } from '@ocfe-explorer/scan-state/explorer-scan-state.actions';
import { SWTracesAction, SWTracesActions } from '@ocfe-explorer/snark-workers-traces/snark-workers-traces.actions';

export type ExplorerActions = ExplorerBlocksActions & ExplorerTransactionsActions & ExplorerSnarksActions & ExplorerScanStateActions & SWTracesActions;
export type ExplorerAction = ExplorerBlocksAction & ExplorerTransactionsAction & ExplorerSnarksAction & ExplorerScanStateAction & SWTracesAction;

export const reducer: ActionReducer<ExplorerState, ExplorerActions> = combineReducers<ExplorerState, ExplorerActions>({
  blocks: fromBlocks.reducer,
  transactions: fromTxs.reducer,
  snarks: fromSnarks.reducer,
  scanState: fromScanState.reducer,
  snarksTraces: fromSnarkTraces.reducer,
});
