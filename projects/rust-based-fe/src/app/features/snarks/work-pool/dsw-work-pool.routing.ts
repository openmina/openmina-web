import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SNARKS_TITLE } from '@rufe-app/app.routing';
import { DswWorkPoolComponent } from '@rufe-snarks/work-pool/dsw-work-pool.component';


const routes: Routes = [
  {
    path: '',
    component: DswWorkPoolComponent,
    children: [
      {
        path: ':id',
        component: DswWorkPoolComponent,
        title: SNARKS_TITLE,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DswWorkPoolRouting {}
