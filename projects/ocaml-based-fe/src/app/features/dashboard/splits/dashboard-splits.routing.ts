import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSplitsComponent } from '@ocfe-dashboard/splits/dashboard-splits.component';
import { DASHBOARD_TITLE } from '@ocfe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: DashboardSplitsComponent,
    children: [
      {
        path: ':addr',
        component: DashboardSplitsComponent,
        title: DASHBOARD_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSplitsRouting {}
