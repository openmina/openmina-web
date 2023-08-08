import { NgModule } from '@angular/core';

import { SystemResourcesComponent } from './system-resources.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { SystemResourcesRouting } from './system-resources.routing';
import { EffectsModule } from '@ngrx/effects';
import { SystemResourcesEffects } from '@ocfe-resources/system/system-resources.effects';
import { SystemResourcesGraphComponent } from './graph/system-resources-graph.component';
import { SystemResourcesGraphListComponent } from '@ocfe-resources/system/graph-list/system-resources-graph-list.component';
import { SystemResourcesSidePanelComponent } from './side-panel/system-resources-side-panel.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';


@NgModule({
  declarations: [
    SystemResourcesComponent,
    SystemResourcesGraphComponent,
    SystemResourcesGraphListComponent,
    SystemResourcesSidePanelComponent,
  ],
  imports: [
    SharedModule,
    SystemResourcesRouting,
    EffectsModule.forFeature([SystemResourcesEffects]),
    HorizontalResizableContainerComponent,
  ],
})
export class SystemResourcesModule {}
