import { TestingToolScenarioStep } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-step.type';

export interface TestingToolScenario {
  info: {
    id: string;
    description: string;
  };
  steps: TestingToolScenarioStep[];
}
