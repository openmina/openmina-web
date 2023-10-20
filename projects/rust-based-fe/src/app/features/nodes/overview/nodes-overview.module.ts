import { NgModule } from '@angular/core';

import { NodesOverviewRouting } from './nodes-overview.routing';
import { NodesOverviewComponent } from './nodes-overview.component';
import { NodesOverviewTableComponent } from '@rufe-nodes/overview/nodes-overview-table/nodes-overview-table.component';
import { NodesOverviewSidePanelComponent } from '@rufe-nodes/overview/nodes-overview-side-panel/nodes-overview-side-panel.component';
import { NodesOverviewToolbarComponent } from '@rufe-nodes/overview/nodes-overview-toolbar/nodes-overview-toolbar.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NodesOverviewEffects } from '@rufe-nodes/overview/nodes-overview.effects';
import { NodesOverviewLedgersComponent } from '@rufe-nodes/overview/nodes-overview-ledgers/nodes-overview-ledgers.component';
import { CopyComponent, HorizontalMenuComponent, HorizontalResizableContainerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    NodesOverviewComponent,
    NodesOverviewTableComponent,
    NodesOverviewSidePanelComponent,
    NodesOverviewToolbarComponent,
    NodesOverviewLedgersComponent,
  ],
  imports: [
    SharedModule,
    NodesOverviewRouting,
    HorizontalResizableContainerComponent,
    EffectsModule.forFeature(NodesOverviewEffects),
    HorizontalMenuComponent,
    CopyComponent,
  ],
})
export class NodesOverviewModule {}
