import { StateActionGroupAction } from '@rufe-shared/types/state/actions/state-action-group-action.type';

export interface StateActionGroup {
  groupName: string;
  count: number;
  totalTime: number;
  meanTime: number;
  actions: StateActionGroupAction[];
  display: boolean;
}
