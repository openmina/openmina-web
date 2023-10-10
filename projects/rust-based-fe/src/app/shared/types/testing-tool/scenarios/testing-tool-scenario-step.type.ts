export interface TestingToolScenarioStep {
  index: number;
  kind: string;
  dialer?: number;
  listener?: string;
  node_id?: number;
  event?: string;
}
