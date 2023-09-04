import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanStateComponent } from '@rufe-snarks/scan-state/scan-state.component';
import { SNARKS_TITLE } from '@rufe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: ScanStateComponent,
    children: [
      {
        path: ':heightOrHash',
        component: ScanStateComponent,
        title: SNARKS_TITLE,
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanStateRouting {}
