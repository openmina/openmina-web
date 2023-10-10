import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { TestingToolScenariosCreateCluster } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';
import {
  selectTestingToolScenariosScenario,
  selectTestingToolScenariosScenarioIsRunning,
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.state';
import { skip } from 'rxjs';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';

@Component({
  selector: 'mina-scenarios-steps-toolbar',
  templateUrl: './scenarios-steps-toolbar.component.html',
  styleUrls: ['./scenarios-steps-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fx-row-vert-cent h-xl pl-12' },
})
export class ScenariosStepsToolbarComponent extends StoreDispatcher implements OnInit {

  scenarioIsRunning: boolean = false;
  scenario: TestingToolScenario;

  constructor() {super();}

  ngOnInit(): void {
    this.listenToRunningScenario();
    this.listenToScenario();
  }

  runSteps(): void {
    this.dispatch(TestingToolScenariosCreateCluster);
  }

  private listenToRunningScenario(): void {
    this.select(selectTestingToolScenariosScenarioIsRunning, (running: boolean) => {
      this.scenarioIsRunning = running;
      this.detect();
    }, skip(1));
  }

  private listenToScenario(): void {
    this.select(selectTestingToolScenariosScenario, (scenario: TestingToolScenario) => {
      this.scenario = scenario;
      this.detect();
    }, skip(1));
  }
}
