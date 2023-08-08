import { ActionReducer, combineReducers } from '@ngrx/store';
import { StorageState } from '@ocfe-storage/storage.state';

import * as fromAccounts from '@ocfe-storage/accounts/storage-accounts.reducer';
import { StorageAccountsAction, StorageAccountsActions } from '@ocfe-storage/accounts/storage-accounts.actions';

export type StorageActions =
  & StorageAccountsActions
export type StorageAction =
  & StorageAccountsAction

export const reducer: ActionReducer<StorageState, StorageActions> = combineReducers<StorageState, StorageActions>({
  accounts: fromAccounts.reducer,
});
