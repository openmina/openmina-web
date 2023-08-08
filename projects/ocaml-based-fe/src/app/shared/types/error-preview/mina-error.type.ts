import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';

export interface MinaError {
  type: MinaErrorType;
  message: string;
  timestamp: number | string;
  seen: boolean;
  status?: string;
}
