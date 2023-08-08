import { AppNodeStatusTypes } from '@ocfe-shared/types/app/app-node-status-types.enum';

export interface NodeStatus {
  blockLevel: number;
  timestamp: number;
  status: AppNodeStatusTypes;
}
