import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DswDashboardComponent } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.component';
import { NODES_TITLE } from '@rufe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: DswDashboardComponent,
    children: [
      {
        path: ':node',
        component: DswDashboardComponent,
        title: NODES_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswDashboardRouting {}
