import { MinaState } from '@fufe-app/app.setup';
import { MinaError } from '@fufe-shared/types/error-preview/mina-error.type';

export class ErrorPreviewState {
  errors: MinaError[];
}

export const selectErrorPreviewErrors = (state: MinaState): MinaError[] => state.error.errors;
