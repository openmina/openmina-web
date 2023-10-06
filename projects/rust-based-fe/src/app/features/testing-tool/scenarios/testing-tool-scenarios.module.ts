import { NgModule } from '@angular/core';

import { TestingToolScenariosRouting } from './testing-tool-scenarios.routing';
import { TestingToolScenariosComponent } from './testing-tool-scenarios.component';
import { ScenariosStepsTableComponent } from './scenarios-steps-table/scenarios-steps-table.component';
import {
  ScenariosEventTracesTableComponent
} from './scenarios-event-traces-table/scenarios-event-traces-table.component';
import { ScenariosAddStepComponent } from './scenarios-add-step/scenarios-add-step.component';
import { ScenariosStepsToolbarComponent } from './scenarios-steps-toolbar/scenarios-steps-toolbar.component';
import { ScenariosStepsFooterComponent } from './scenarios-steps-footer/scenarios-steps-footer.component';
import { SharedModule } from '@rufe-shared/shared.module';


@NgModule({
  declarations: [
    TestingToolScenariosComponent,
    ScenariosStepsTableComponent,
    ScenariosEventTracesTableComponent,
    ScenariosAddStepComponent,
    ScenariosStepsToolbarComponent,
    ScenariosStepsFooterComponent
  ],
  imports: [
    SharedModule,
    TestingToolScenariosRouting
  ]
})
export class TestingToolScenariosModule { }
