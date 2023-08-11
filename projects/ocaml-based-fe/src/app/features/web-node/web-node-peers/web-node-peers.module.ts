import { NgModule } from '@angular/core';

import { WebNodePeersRouting } from './web-node-peers.routing';
import { WebNodePeersComponent } from './web-node-peers.component';
import { WebNodePeersTableComponent } from './web-node-peers-table/web-node-peers-table.component';
import { WebNodePeersToolbarComponent } from './web-node-peers-toolbar/web-node-peers-toolbar.component';
import { WebNodePeersConnectComponent } from './web-node-peers-connect/web-node-peers-connect.component';
import { WebNodePeersListenComponent } from './web-node-peers-listen/web-node-peers-listen.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { WebNodePeersSidePanelComponent } from './web-node-peers-side-panel/web-node-peers-side-panel.component';
import {
  CopyComponent,
  HorizontalResizableContainerComponent,
  MinaJsonViewerComponent,
  StepperComponent
} from '@openmina/shared';


@NgModule({
  declarations: [
    WebNodePeersComponent,
    WebNodePeersTableComponent,
    WebNodePeersToolbarComponent,
    WebNodePeersConnectComponent,
    WebNodePeersListenComponent,
    WebNodePeersSidePanelComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    StepperComponent,
    MinaJsonViewerComponent,
    WebNodePeersRouting,
    HorizontalResizableContainerComponent,
  ],
})
export class WebNodePeersModule {}
