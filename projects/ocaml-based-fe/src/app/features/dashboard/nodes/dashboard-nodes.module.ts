import { NgModule } from '@angular/core';

import { DashboardNodesRouting } from './dashboard-nodes.routing';
import { DashboardNodesComponent } from './dashboard-nodes.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { DashboardNodesTableComponent } from './dashboard-nodes-table/dashboard-nodes-table.component';
import { DashboardNodesToolbarComponent } from './dashboard-nodes-toolbar/dashboard-nodes-toolbar.component';
import { EffectsModule } from '@ngrx/effects';
import { DashboardNodesEffects } from '@ocfe-dashboard/nodes/dashboard-nodes.effects';
import { DashboardNodesSidePanelComponent } from './dashboard-nodes-side-panel/dashboard-nodes-side-panel.component';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { HorizontalMenuComponent } from '@ocfe-shared/components/horizontal-menu/horizontal-menu.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';


@NgModule({
  declarations: [
    DashboardNodesComponent,
    DashboardNodesTableComponent,
    DashboardNodesToolbarComponent,
    DashboardNodesSidePanelComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    DashboardNodesRouting,
    EffectsModule.forFeature([DashboardNodesEffects]),
    HorizontalMenuComponent,
    HorizontalResizableContainerComponent,
  ],
})
export class DashboardNodesModule {}
