import { NgModule } from '@angular/core';

import { DswActionsRouting } from './dsw-actions.routing';
import { DswActionsComponent } from './dsw-actions.component';
import { DswActionsToolbarComponent } from './dsw-actions-toolbar/dsw-actions-toolbar.component';
import { DswActionsSidePanelComponent } from './dsw-actions-side-panel/dsw-actions-side-panel.component';
import { DswActionsGraphListComponent } from './dsw-actions-graph-list/dsw-actions-graph-list.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { DswActionsEffects } from '@rufe-state/actions/dsw-actions.effects';
import {
  CopyComponent,
  FlameTimeGraphComponent,
  HorizontalMenuComponent,
  HorizontalResizableContainerComponent
} from '@openmina/shared';


@NgModule({
  declarations: [
    DswActionsComponent,
    DswActionsToolbarComponent,
    DswActionsSidePanelComponent,
    DswActionsGraphListComponent,
  ],
  imports: [
    SharedModule,
    DswActionsRouting,
    HorizontalResizableContainerComponent,
    EffectsModule.forFeature(DswActionsEffects),
    FlameTimeGraphComponent,
    HorizontalMenuComponent,
    CopyComponent,
  ],
})
export class DswActionsModule {}
