import { NgModule } from '@angular/core';

import { WebNodeLogsRouting } from './web-node-logs.routing';
import { WebNodeLogsComponent } from './web-node-logs.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { WebNodeLogsTableComponent } from './web-node-logs-table/web-node-logs-table.component';
import { WebNodeLogsSidePanelComponent } from './web-node-logs-side-panel/web-node-logs-side-panel.component';
import { MinaJsonViewerComponent } from '@ocfe-shared/components/mina-json-viewer/mina-json-viewer.component';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';


@NgModule({
  declarations: [
    WebNodeLogsComponent,
    WebNodeLogsTableComponent,
    WebNodeLogsSidePanelComponent,
  ],
  imports: [
    WebNodeLogsRouting,
    MinaJsonViewerComponent,
    SharedModule,
    CopyComponent,
    HorizontalResizableContainerComponent,
  ],
})
export class WebNodeLogsModule {}
