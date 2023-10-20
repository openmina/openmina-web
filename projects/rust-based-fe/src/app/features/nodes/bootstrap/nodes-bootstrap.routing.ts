import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NODES_TITLE } from '@rufe-app/app.routing';
import { NodesBootstrapComponent } from '@rufe-nodes/bootstrap/nodes-bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: NodesBootstrapComponent,
    children: [
      {
        path: ':index',
        component: NodesBootstrapComponent,
        title: NODES_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodesBootstrapRouting {}
