import { TestingToolScenariosState } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.state';
import {
  TESTING_TOOL_SCENARIOS_CLOSE,
  TESTING_TOOL_SCENARIOS_CREATE_CLUSTER_SUCCESS,
  TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS_SUCCESS,
  TESTING_TOOL_SCENARIOS_GET_SCENARIO_SUCCESS,
  TestingToolScenariosActions
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';

const initialState: TestingToolScenariosState = {
  scenario: undefined,
  pendingEvents: [],
  clusterId: undefined,
};

export function reducer(state: TestingToolScenariosState = initialState, action: TestingToolScenariosActions): TestingToolScenariosState {
  switch (action.type) {

    case TESTING_TOOL_SCENARIOS_GET_SCENARIO_SUCCESS: {
      return {
        ...state,
        scenario: action.payload,
      };
    }

    case TESTING_TOOL_SCENARIOS_CREATE_CLUSTER_SUCCESS: {
      return {
        ...state,
        clusterId: action.payload,
      };
    }

    case TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS_SUCCESS: {
      return {
        ...state,
        pendingEvents: action.payload,
      };
    }

    case TESTING_TOOL_SCENARIOS_CLOSE:
      return initialState;

    default:
      return state;
  }
}
