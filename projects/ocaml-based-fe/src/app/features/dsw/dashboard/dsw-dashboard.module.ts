import { NgModule } from '@angular/core';

import { DswDashboardRouting } from './dsw-dashboard.routing';
import { DswDashboardComponent } from './dsw-dashboard.component';
import { DswDashboardTableComponent } from './dsw-dashboard-table/dsw-dashboard-table.component';
import { DswDashboardSidePanelComponent } from './dsw-dashboard-side-panel/dsw-dashboard-side-panel.component';
import { DswDashboardToolbarComponent } from './dsw-dashboard-toolbar/dsw-dashboard-toolbar.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { DswDashboardEffects } from '@ocfe-dsw/dashboard/dsw-dashboard.effects';
import { HorizontalMenuComponent } from '@ocfe-shared/components/horizontal-menu/horizontal-menu.component';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { DswDashboardLedgersComponent } from './dsw-dashboard-ledgers/dsw-dashboard-ledgers.component';


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
