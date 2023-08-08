import { MinaState } from '@ocfe-app/app.setup';
import { MinaError } from '@ocfe-shared/types/error-preview/mina-error.type';

export class ErrorPreviewState {
  errors: MinaError[];
}

export const selectErrorPreviewErrors = (state: MinaState): MinaError[] => state.error.errors;
