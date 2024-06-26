import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateActionsComponent } from '@rufe-state/actions/state-actions.component';
import { STATE_TITLE } from '@rufe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: StateActionsComponent,
    children: [
      {
        path: ':id',
        component: StateActionsComponent,
        title: STATE_TITLE,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateActionsRouting {}
