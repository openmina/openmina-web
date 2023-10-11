import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import {
  TestingToolScenariosClose, TestingToolScenariosGetPendingEvents,
  TestingToolScenariosGetScenario,
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';
import {
  selectTestingToolScenariosScenario,
  selectTestingToolScenariosScenarioHasRun,
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.state';
import { filter, timer } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { FuzzingGetDirectories, FuzzingGetFiles } from '@fufe-fuzzing/fuzzing.actions';

@Component({
  selector: 'mina-testing-tool-scenarios',
  templateUrl: './testing-tool-scenarios.component.html',
  styleUrls: ['./testing-tool-scenarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingToolScenariosComponent extends StoreDispatcher implements OnInit, OnDestroy {

  private hasRun: boolean = false;

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    this.dispatch(TestingToolScenariosGetScenario);
    this.listenToScenario();
    this.getPendingEvents();
  }

  private listenToScenario(): void {
    this.select(selectTestingToolScenariosScenarioHasRun, (hasRun: boolean) => {
      console.log('hasRun', hasRun);
      this.hasRun = hasRun;
    });
  }

  private getPendingEvents(): void {
    timer(0, 3000)
      .pipe(
        untilDestroyed(this),
        filter(() => this.hasRun),
      )
      .subscribe(() => {
        this.dispatch(TestingToolScenariosGetPendingEvents);
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(TestingToolScenariosClose);
  }
}
