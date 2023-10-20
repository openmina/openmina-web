import { NgModule } from '@angular/core';

import { NodesLiveRouting } from './nodes-live.routing';
import { NodesLiveComponent } from './nodes-live.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NodesLiveEffects } from '@rufe-nodes/live/nodes-live.effects';
import { NodesLiveToolbarComponent } from '@rufe-nodes/live/nodes-live-toolbar/nodes-live-toolbar.component';
import { NodesLiveFiltersComponent } from '@rufe-nodes/live/nodes-live-filters/nodes-live-filters.component';
import { NodesLiveBlocksMapComponent } from '@rufe-nodes/live/nodes-live-blocks-map/nodes-live-blocks-map.component';
import { NodesLiveEventsTableComponent } from '@rufe-nodes/live/nodes-live-events-table/nodes-live-events-table.component';
import { NodesLiveStatusCountsComponent } from '@rufe-nodes/live/nodes-live-status-counts/nodes-live-status-counts.component';
import { CopyComponent, HorizontalResizableContainerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    NodesLiveComponent,
    NodesLiveToolbarComponent,
    NodesLiveFiltersComponent,
    NodesLiveBlocksMapComponent,
    NodesLiveEventsTableComponent,
    NodesLiveStatusCountsComponent,
  ],
  imports: [
    SharedModule,
    NodesLiveRouting,
    EffectsModule.forFeature(NodesLiveEffects),
    HorizontalResizableContainerComponent,
    CopyComponent,
  ],
})
export class NodesLiveModule {}
