import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';
import { TestingToolScenarioEvent } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-event.type';
import { selectTestingToolScenariosState } from '@rufe-testing-tool/testing-tool.state';

export interface TestingToolScenariosState {
  scenario: TestingToolScenario;
  pendingEvents: TestingToolScenarioEvent[];
}

const select = <T>(selector: (state: TestingToolScenariosState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectTestingToolScenariosState,
  selector,
);

export const selectTestingToolScenariosScenario = select((state: TestingToolScenariosState): TestingToolScenario => state.scenario);
export const selectTestingToolScenariosPendingEvents = select((state: TestingToolScenariosState): TestingToolScenarioEvent[] => state.pendingEvents);
