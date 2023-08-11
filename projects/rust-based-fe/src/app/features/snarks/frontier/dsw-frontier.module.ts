import { NgModule } from '@angular/core';

import { DswFrontierRouting } from './dsw-frontier.routing';
import { DswFrontierComponent } from '@rufe-snarks/frontier/dsw-frontier.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { DswFrontierEffects } from '@rufe-snarks/frontier/dsw-frontier.effects';
import { DswFrontierTableComponent } from './dsw-frontier-table/dsw-frontier-table.component';
import { DswFrontierSidePanelComponent } from './dsw-frontier-side-panel/dsw-frontier-side-panel.component';
import { DswFrontierToolbarComponent } from './dsw-frontier-toolbar/dsw-frontier-toolbar.component';
import { HorizontalResizableContainerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    DswFrontierComponent,
    DswFrontierTableComponent,
    DswFrontierSidePanelComponent,
    DswFrontierToolbarComponent,
  ],
  imports: [
    SharedModule,
    DswFrontierRouting,
    EffectsModule.forFeature(DswFrontierEffects),
    HorizontalResizableContainerComponent,
  ],
})
export class DswFrontierModule {}
