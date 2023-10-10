import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import {
  TestingToolScenariosClose,
  TestingToolScenariosGetScenario,
} from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';

@Component({
  selector: 'mina-testing-tool-scenarios',
  templateUrl: './testing-tool-scenarios.component.html',
  styleUrls: ['./testing-tool-scenarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingToolScenariosComponent extends StoreDispatcher implements OnInit, OnDestroy {

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    this.dispatch(TestingToolScenariosGetScenario, '1');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(TestingToolScenariosClose);
  }
}
