import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DswActionsComponent } from '@rufe-state/actions/dsw-actions.component';
import { STATE_TITLE } from '@rufe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: DswActionsComponent,
    children: [
      {
        path: ':id',
        component: DswActionsComponent,
        title: STATE_TITLE,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswActionsRouting {}
