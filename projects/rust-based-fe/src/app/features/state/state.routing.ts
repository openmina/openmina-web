import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATE_TITLE } from '@rufe-app/app.routing';
import { StateComponent } from '@rufe-app/features/state/state.component';

const routes: Routes = [
  {
    path: '',
    component: StateComponent,
    children: [
      {
        path: 'actions',
        loadChildren: () => import('./actions/state-actions.module').then(m => m.StateActionsModule),
        title: STATE_TITLE,
      },
      {
        path: '**',
        redirectTo: 'actions',
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
export class StateRouting { }
