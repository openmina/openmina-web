import { NgModule } from '@angular/core';

import { LogsRouting } from './logs.routing';
import { LogsComponent } from './logs.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { LogsEffects } from '@ocfe-logs/logs.effects';
import { LogsTableComponent } from './logs-table/logs-table.component';
import { LogsToolbarComponent } from './logs-toolbar/logs-toolbar.component';
import { LogsSidePanelComponent } from './logs-side-panel/logs-side-panel.component';
import { HorizontalResizableContainerComponent, MinaJsonViewerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    LogsComponent,
    LogsTableComponent,
    LogsToolbarComponent,
    LogsSidePanelComponent,
  ],
  imports: [
    SharedModule,
    MinaJsonViewerComponent,
    LogsRouting,
    EffectsModule.forFeature([LogsEffects]),
    HorizontalResizableContainerComponent,
  ],
})
export class LogsModule {}
