import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebNodePeersComponent } from '@ocfe-web-node/web-node-peers/web-node-peers.component';
import { WebNodePeersTableComponent } from '@ocfe-web-node/web-node-peers/web-node-peers-table/web-node-peers-table.component';
import { WebNodePeersConnectComponent } from '@ocfe-web-node/web-node-peers/web-node-peers-connect/web-node-peers-connect.component';
import { WebNodePeersListenComponent } from '@ocfe-web-node/web-node-peers/web-node-peers-listen/web-node-peers-listen.component';
import { WEB_NODE_TITLE } from '@ocfe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: WebNodePeersComponent,
    children: [
      {
        path: '',
        component: WebNodePeersTableComponent,
        title: WEB_NODE_TITLE,
      },
      {
        path: 'connect',
        component: WebNodePeersConnectComponent,
        title: WEB_NODE_TITLE,
      },
      {
        path: 'listen',
        component: WebNodePeersListenComponent,
        title: WEB_NODE_TITLE,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebNodePeersRouting {}
