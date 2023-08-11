import { NgModule } from '@angular/core';

import { DswLiveRouting } from './dsw-live.routing';
import { DswLiveComponent } from './dsw-live.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { DswLiveEffects } from '@ocfe-dsw/live/dsw-live.effects';
import { DswLiveToolbarComponent } from './dsw-live-toolbar/dsw-live-toolbar.component';
import { DswLiveFiltersComponent } from './dsw-live-filters/dsw-live-filters.component';
import { DswLiveBlocksMapComponent } from './dsw-live-blocks-map/dsw-live-blocks-map.component';
import { DswLiveEventsTableComponent } from './dsw-live-events-table/dsw-live-events-table.component';
import { DswLiveStatusCountsComponent } from './dsw-live-status-counts/dsw-live-status-counts.component';
import { CopyComponent, HorizontalResizableContainerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    DswLiveComponent,
    DswLiveToolbarComponent,
    DswLiveFiltersComponent,
    DswLiveBlocksMapComponent,
    DswLiveEventsTableComponent,
    DswLiveStatusCountsComponent,
  ],
  imports: [
    SharedModule,
    DswLiveRouting,
    EffectsModule.forFeature(DswLiveEffects),
    HorizontalResizableContainerComponent,
    CopyComponent,
  ],
})
export class DswLiveModule {}
