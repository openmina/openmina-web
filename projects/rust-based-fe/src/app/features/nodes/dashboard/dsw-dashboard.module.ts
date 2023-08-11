import { NgModule } from '@angular/core';

import { DswDashboardRouting } from './dsw-dashboard.routing';
import { DswDashboardComponent } from './dsw-dashboard.component';
import { DswDashboardTableComponent } from './dsw-dashboard-table/dsw-dashboard-table.component';
import { DswDashboardSidePanelComponent } from './dsw-dashboard-side-panel/dsw-dashboard-side-panel.component';
import { DswDashboardToolbarComponent } from './dsw-dashboard-toolbar/dsw-dashboard-toolbar.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { DswDashboardEffects } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.effects';
import { DswDashboardLedgersComponent } from './dsw-dashboard-ledgers/dsw-dashboard-ledgers.component';
import { CopyComponent, HorizontalMenuComponent, HorizontalResizableContainerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    DswDashboardComponent,
    DswDashboardTableComponent,
    DswDashboardSidePanelComponent,
    DswDashboardToolbarComponent,
    DswDashboardLedgersComponent,
  ],
  imports: [
    SharedModule,
    DswDashboardRouting,
    HorizontalResizableContainerComponent,
    EffectsModule.forFeature(DswDashboardEffects),
    HorizontalMenuComponent,
    CopyComponent,
  ],
})
export class DswDashboardModule {}
