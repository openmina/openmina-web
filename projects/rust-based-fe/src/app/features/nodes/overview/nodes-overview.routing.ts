import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodesOverviewComponent } from '@rufe-nodes/overview/nodes-overview.component';
import { NODES_TITLE } from '@rufe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: NodesOverviewComponent,
    children: [
      {
        path: ':node',
        component: NodesOverviewComponent,
        title: NODES_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodesOverviewRouting {}
