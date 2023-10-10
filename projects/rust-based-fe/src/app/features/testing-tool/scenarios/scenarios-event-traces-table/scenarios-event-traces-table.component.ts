import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import {
  selectTestingToolScenariosPendingEvents,
  selectTestingToolScenariosScenario, selectTestingToolScenariosScenarioIsRunning,
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.state';
import { TestingToolScenarioEvent } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-event.type';
import { TestingToolScenariosAddStep } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';
import { skip } from 'rxjs';

@Component({
  selector: 'mina-scenarios-event-traces-table',
  templateUrl: './scenarios-event-traces-table.component.html',
  styleUrls: ['./scenarios-event-traces-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column' },
})
export class ScenariosEventTracesTableComponent extends StoreDispatcher implements OnInit {

  events: TestingToolScenarioEvent[];
  scenarioIsRunning: boolean = false;

  constructor() {super();}

  ngOnInit(): void {
    this.listenToEvents();
    this.listenToRunningScenario();
  }

  addEventToSteps(event: TestingToolScenarioEvent): void {
    this.dispatch(TestingToolScenariosAddStep, {
      step: {
        kind: 'Event',
        node_id: event.node_id,
        event: event.event,
      },
    });
  }

  private listenToEvents(): void {
    this.select(selectTestingToolScenariosPendingEvents, (events: TestingToolScenarioEvent[]) => {
      this.events = events;
      this.detect();
    });
  }

  private listenToRunningScenario(): void {
    this.select(selectTestingToolScenariosScenarioIsRunning, (running: boolean) => {
      this.scenarioIsRunning = running;
      this.detect();
    }, skip(1));
  }
}
