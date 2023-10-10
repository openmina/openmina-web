import { Injectable } from '@angular/core';
import { Effect } from '@openmina/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@rufe-app/app.setup';
import { EMPTY, map, switchMap } from 'rxjs';
import { catchErrorAndRepeat } from '@rufe-shared/constants/store-functions';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';
import { MinaRustBaseEffect } from '@rufe-shared/base-classes/mina-rust-base.effect';
import {
  TESTING_TOOL_SCENARIOS_CLOSE,
  TESTING_TOOL_SCENARIOS_CREATE_CLUSTER,
  TESTING_TOOL_SCENARIOS_CREATE_CLUSTER_SUCCESS,
  TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS,
  TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS_SUCCESS,
  TESTING_TOOL_SCENARIOS_GET_SCENARIO,
  TESTING_TOOL_SCENARIOS_GET_SCENARIO_SUCCESS,
  TESTING_TOOL_SCENARIOS_START_SCENARIO,
  TESTING_TOOL_SCENARIOS_START_SCENARIO_SUCCESS,
  TestingToolScenariosActions,
  TestingToolScenariosClose,
  TestingToolScenariosCreateCluster,
  TestingToolScenariosGetPendingEvents,
  TestingToolScenariosGetScenario,
  TestingToolScenariosStartScenario
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';
import { TestingToolScenariosService } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.service';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';
import { TestingToolScenarioEvent } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-event.type';

@Injectable({
  providedIn: 'root',
})
export class TestingToolScenariosEffects extends MinaRustBaseEffect<TestingToolScenariosActions> {

  readonly getScenario$: Effect;
  readonly createCluster$: Effect;
  readonly createClusterSuccess$: Effect;
  readonly startScenario$: Effect;
  readonly startScenarioSuccess$: Effect;
  readonly getPendingEvents$: Effect;

  constructor(private actions$: Actions,
              private testingToolScenariosService: TestingToolScenariosService,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.getScenario$ = createEffect(() => this.actions$.pipe(
      ofType(TESTING_TOOL_SCENARIOS_GET_SCENARIO, TESTING_TOOL_SCENARIOS_CLOSE),
      this.latestActionState<TestingToolScenariosGetScenario | TestingToolScenariosClose>(),
      switchMap(({ action, state }) =>
        action.type === TESTING_TOOL_SCENARIOS_CLOSE
          ? EMPTY
          : this.testingToolScenariosService.getScenario(action.payload),
      ),
      map((payload: TestingToolScenario) => ({ type: TESTING_TOOL_SCENARIOS_GET_SCENARIO_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, TESTING_TOOL_SCENARIOS_GET_SCENARIO_SUCCESS, {}),
    ));

    this.createCluster$ = createEffect(() => this.actions$.pipe(
      ofType(TESTING_TOOL_SCENARIOS_CREATE_CLUSTER),
      this.latestActionState<TestingToolScenariosCreateCluster>(),
      switchMap(({ action, state }) =>
        this.testingToolScenariosService.createCluster(),
      ),
      map((payload: string) => ({ type: TESTING_TOOL_SCENARIOS_CREATE_CLUSTER_SUCCESS, payload })),
      catchErrorAndRepeat(MinaErrorType.GENERIC, TESTING_TOOL_SCENARIOS_CREATE_CLUSTER_SUCCESS),
    ));

    this.createClusterSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(TESTING_TOOL_SCENARIOS_CREATE_CLUSTER_SUCCESS),
      map(() => ({ type: TESTING_TOOL_SCENARIOS_START_SCENARIO })),
    ));

    this.startScenario$ = createEffect(() => this.actions$.pipe(
      ofType(TESTING_TOOL_SCENARIOS_START_SCENARIO),
      this.latestActionState<TestingToolScenariosStartScenario>(),
      switchMap(({ action, state }) =>
        this.testingToolScenariosService.startScenario(state.testingTool.scenarios.clusterId),
      ),
      map(() => ({ type: TESTING_TOOL_SCENARIOS_START_SCENARIO_SUCCESS })),
    ));

    this.startScenarioSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(TESTING_TOOL_SCENARIOS_START_SCENARIO_SUCCESS),
      map(() => ({ type: TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS })),
    ));

    this.getPendingEvents$ = createEffect(() => this.actions$.pipe(
      ofType(TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS),
      this.latestActionState<TestingToolScenariosGetPendingEvents>(),
      switchMap(({ state }) =>
        this.testingToolScenariosService.getPendingEvents(state.testingTool.scenarios.clusterId),
      ),
      map((payload: TestingToolScenarioEvent[]) => ({ type: TESTING_TOOL_SCENARIOS_GET_PENDING_EVENTS_SUCCESS, payload })),
    ));
  }
}
