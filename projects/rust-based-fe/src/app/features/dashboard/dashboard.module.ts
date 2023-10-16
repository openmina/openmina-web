import { NgModule } from '@angular/core';

import { DashboardRouting } from './dashboard.routing';
import { DashboardPeersComponent } from './dashboard-peers/dashboard-peers.component';
import { DashboardNodeComponent } from './dashboard-node/dashboard-node.component';
import { DashboardComponent } from '@rufe-dashboard/dashboard.component';
import { MinaCardComponent } from './mina-card/mina-card.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { DashboardPeersTableComponent } from './dashboard-peers-table/dashboard-peers-table.component';
import { DashboardBlockHeightComponent } from './dashboard-block-height/dashboard-block-height.component';
import { DashboardReceivedComponent } from './dashboard-received/dashboard-received.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPeersComponent,
    DashboardNodeComponent,
    MinaCardComponent,
    DashboardPeersTableComponent,
    DashboardBlockHeightComponent,
    DashboardReceivedComponent,
  ],
  imports: [
    SharedModule,
    DashboardRouting,
  ],
})
export class DashboardModule {}
