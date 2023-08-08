import { NgModule } from '@angular/core';

import { NetworkConnectionsRouting } from './network-connections.routing';
import { NetworkConnectionsComponent } from './network-connections.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { NetworkConnectionsTableComponent } from './network-connections-table/network-connections-table.component';
import { NetworkConnectionsSidePanelComponent } from './network-connections-side-panel/network-connections-side-panel.component';
import { EffectsModule } from '@ngrx/effects';
import { NetworkConnectionsEffects } from '@ocfe-network/connections/network-connections.effects';
import { MinaJsonViewerComponent } from '@ocfe-shared/components/mina-json-viewer/mina-json-viewer.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';


@NgModule({
  declarations: [
    NetworkConnectionsComponent,
    NetworkConnectionsTableComponent,
    NetworkConnectionsSidePanelComponent,
  ],
  imports: [
    SharedModule,
    MinaJsonViewerComponent,
    NetworkConnectionsRouting,
    EffectsModule.forFeature([NetworkConnectionsEffects]),
    HorizontalResizableContainerComponent,
  ],
})
export class NetworkConnectionsModule {}
