import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NODES_TITLE } from '@rufe-app/app.routing';
import { DswBootstrapComponent } from '@rufe-app/features/nodes/bootstrap/dsw-bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: DswBootstrapComponent,
    children: [
      {
        path: ':index',
        component: DswBootstrapComponent,
        title: NODES_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswBootstrapRouting {}
