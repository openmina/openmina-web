import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { TestingToolScenariosGetScenario } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';

@Component({
  selector: 'mina-testing-tool-scenarios',
  templateUrl: './testing-tool-scenarios.component.html',
  styleUrls: ['./testing-tool-scenarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingToolScenariosComponent extends StoreDispatcher implements OnInit {

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    this.dispatch(TestingToolScenariosGetScenario, '1');
  }
}
