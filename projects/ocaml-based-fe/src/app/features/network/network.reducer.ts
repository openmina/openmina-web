import { ActionReducer, combineReducers } from '@ngrx/store';
import { NetworkState } from '@ocfe-network/network.state';

import * as fromMessages from '@ocfe-network/messages/network-messages.reducer';
import * as fromConnections from '@ocfe-network/connections/network-connections.reducer';
import * as fromBlocks from '@ocfe-network/blocks/network-blocks.reducer';
import * as fromBlocksIpc from '@ocfe-network/blocks-ipc/network-blocks-ipc.reducer';

import { NetworkMessagesAction, NetworkMessagesActions } from '@ocfe-network/messages/network-messages.actions';
import { NetworkConnectionsAction, NetworkConnectionsActions } from '@ocfe-network/connections/network-connections.actions';
import { NetworkBlocksAction, NetworkBlocksActions } from '@ocfe-network/blocks/network-blocks.actions';
import { NetworkBlocksIpcAction, NetworkBlocksIpcActions } from '@ocfe-network/blocks-ipc/network-blocks-ipc.actions';

export type NetworkActions = NetworkMessagesActions & NetworkConnectionsActions & NetworkBlocksActions & NetworkBlocksIpcActions;
export type NetworkAction = NetworkMessagesAction & NetworkConnectionsAction & NetworkBlocksAction & NetworkBlocksIpcAction;

export const reducer: ActionReducer<NetworkState, NetworkActions> = combineReducers<NetworkState, NetworkActions>({
  messages: fromMessages.reducer,
  connections: fromConnections.reducer,
  blocks: fromBlocks.reducer,
  blocksIpc: fromBlocksIpc.reducer,
});
