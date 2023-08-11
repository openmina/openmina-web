import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SNARKS_TITLE } from '@rufe-app/app.routing';
import { DswFrontierComponent } from '@rufe-snarks/frontier/dsw-frontier.component';

const routes: Routes = [
  {
    path: '',
    component: DswFrontierComponent,
    children: [
      {
        path: ':log',
        component: DswFrontierComponent,
        title: SNARKS_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswFrontierRouting {}
