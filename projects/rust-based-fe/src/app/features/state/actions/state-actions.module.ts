import { NgModule } from '@angular/core';

import { StateActionsRouting } from './state-actions.routing';
import { StateActionsComponent } from './state-actions.component';
import { StateActionsToolbarComponent } from '@rufe-state/actions/state-actions-toolbar/state-actions-toolbar.component';
import { StateActionsSidePanelComponent } from '@rufe-state/actions/state-actions-side-panel/state-actions-side-panel.component';
import { StateActionsGraphListComponent } from '@rufe-state/actions/state-actions-graph-list/state-actions-graph-list.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StateActionsEffects } from '@rufe-state/actions/state-actions.effects';
import {
  CopyComponent,
  FlameTimeGraphComponent,
  HorizontalMenuComponent,
  HorizontalResizableContainerComponent
} from '@openmina/shared';


@NgModule({
  declarations: [
    StateActionsComponent,
    StateActionsToolbarComponent,
    StateActionsSidePanelComponent,
    StateActionsGraphListComponent,
  ],
  imports: [
    SharedModule,
    StateActionsRouting,
    HorizontalResizableContainerComponent,
    EffectsModule.forFeature(StateActionsEffects),
    FlameTimeGraphComponent,
    HorizontalMenuComponent,
    CopyComponent,
  ],
})
export class StateActionsModule {}
