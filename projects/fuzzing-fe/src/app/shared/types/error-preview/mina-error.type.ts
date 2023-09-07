import { MinaErrorType } from './mina-error-type.enum';

export interface MinaError {
  type: MinaErrorType;
  message: string;
  timestamp: number | string;
  seen: boolean;
  status?: string;
}
