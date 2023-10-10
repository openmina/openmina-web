import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectTestingToolScenariosPendingEvents } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.state';
import { TestingToolScenarioEvent } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-event.type';

@Component({
  selector: 'mina-scenarios-event-traces-table',
  templateUrl: './scenarios-event-traces-table.component.html',
  styleUrls: ['./scenarios-event-traces-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenariosEventTracesTableComponent extends StoreDispatcher implements OnInit {

  events: TestingToolScenarioEvent[];

  constructor() {super();}

  ngOnInit(): void {
    this.listenToEvents();
  }

  private listenToEvents(): void {
    this.select(selectTestingToolScenariosPendingEvents, (events: TestingToolScenarioEvent[]) => {
      this.events = events;
      this.detect();
    });
  }
}
