import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NODES_TITLE } from '@rufe-app/app.routing';
import { DswLiveComponent } from '@rufe-app/features/nodes/live/dsw-live.component';

const routes: Routes = [
  {
    path: '',
    component: DswLiveComponent,
    children: [
      {
        path: ':bestTip',
        component: DswLiveComponent,
        title: NODES_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswLiveRouting {}
