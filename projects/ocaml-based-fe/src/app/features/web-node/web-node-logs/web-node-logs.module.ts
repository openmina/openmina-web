import { NgModule } from '@angular/core';

import { WebNodeLogsRouting } from './web-node-logs.routing';
import { WebNodeLogsComponent } from './web-node-logs.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { WebNodeLogsTableComponent } from './web-node-logs-table/web-node-logs-table.component';
import { WebNodeLogsSidePanelComponent } from './web-node-logs-side-panel/web-node-logs-side-panel.component';
import { CopyComponent, HorizontalResizableContainerComponent, MinaJsonViewerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    WebNodeLogsComponent,
    WebNodeLogsTableComponent,
    WebNodeLogsSidePanelComponent,
  ],
  imports: [
    SharedModule,
    WebNodeLogsRouting,
    MinaJsonViewerComponent,
    CopyComponent,
    HorizontalResizableContainerComponent,
  ],
})
export class WebNodeLogsModule {}
