import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SNARKS_TITLE } from '@rufe-app/app.routing';
import { SnarksComponent } from '@rufe-snarks/snarks.component';

const routes: Routes = [
  {
    path: '',
    component: SnarksComponent,
    children: [
      {
        path: 'work-pool',
        loadChildren: () => import('@rufe-snarks/work-pool/dsw-work-pool.module').then(m => m.DswWorkPoolModule),
        title: SNARKS_TITLE,
      },
      {
        path: 'scan-state',
        loadChildren: () => import('@rufe-snarks/scan-state/scan-state.module').then(m => m.ScanStateModule),
        title: SNARKS_TITLE,
      },
      {
        path: '**',
        redirectTo: 'work-pool',
        pathMatch: 'full',
      },
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
export class SnarksRouting {}
