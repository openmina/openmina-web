import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { TestingToolScenariosAddStep } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.actions';

@Component({
  selector: 'mina-scenarios-steps-footer',
  templateUrl: './scenarios-steps-footer.component.html',
  styleUrls: ['./scenarios-steps-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column p-12' },
})
export class ScenariosStepsFooterComponent extends StoreDispatcher {

  stepIsAdding: boolean = false;

  addStep(json: string): void {
    this.dispatch(TestingToolScenariosAddStep, { step: json });
  }
}
