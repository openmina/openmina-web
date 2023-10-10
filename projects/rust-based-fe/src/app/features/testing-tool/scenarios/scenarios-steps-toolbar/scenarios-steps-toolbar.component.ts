import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { TestingToolScenariosCreateCluster } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';

@Component({
  selector: 'mina-scenarios-steps-toolbar',
  templateUrl: './scenarios-steps-toolbar.component.html',
  styleUrls: ['./scenarios-steps-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-row h-xl' }
})
export class ScenariosStepsToolbarComponent extends StoreDispatcher implements OnInit {

  constructor() {super();}

  ngOnInit(): void {}

  runSteps(): void {
    this.dispatch(TestingToolScenariosCreateCluster, '1');
  }
}
