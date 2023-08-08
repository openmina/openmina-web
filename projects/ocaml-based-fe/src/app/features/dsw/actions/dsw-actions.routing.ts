import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DswActionsComponent } from '@ocfe-dsw/actions/dsw-actions.component';
import { DSW_TITLE } from '@ocfe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: DswActionsComponent,
    children: [
      {
        path: ':id',
        component: DswActionsComponent,
        title: DSW_TITLE,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswActionsRouting {}
