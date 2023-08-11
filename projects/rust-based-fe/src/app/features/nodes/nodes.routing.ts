import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NODES_TITLE } from '@rufe-app/app.routing';
import { NodesComponent } from '@rufe-nodes/nodes.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('@rufe-app/features/nodes/dashboard/dsw-dashboard.module').then(m => m.DswDashboardModule),
        title: NODES_TITLE,
      },
      {
        path: 'bootstrap',
        loadChildren: () => import('@rufe-app/features/nodes/bootstrap/dsw-bootstrap.module').then(m => m.DswBootstrapModule),
        title: NODES_TITLE,
      },
      {
        path: 'live',
        loadChildren: () => import('@rufe-app/features/nodes/live/dsw-live.module').then(m => m.DswLiveModule),
        title: NODES_TITLE,
      },
      {
        path: '**',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodesRouting {}
