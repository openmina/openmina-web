import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { getFirstFeature } from '@rufe-shared/constants/config';

const APP_TITLE: string = 'Open Mina';

export const NODES_TITLE: string = APP_TITLE + ' - Nodes';
export const STATE_TITLE: string = APP_TITLE + ' - State';
export const SNARKS_TITLE: string = APP_TITLE + ' - Snarks';


const routes: Routes = [
  {
    path: 'nodes',
    loadChildren: () => import('@rufe-nodes/nodes.module').then(m => m.NodesModule),
    title: NODES_TITLE,
    // canActivate: [FeatureGuard],
  },
  {
    path: 'state',
    loadChildren: () => import('@rufe-state/state.module').then(m => m.StateModule),
    title: STATE_TITLE,
  },
  {
    path: 'snarks',
    loadChildren: () => import('@rufe-snarks/snarks.module').then(m => m.SnarksModule),
    title: SNARKS_TITLE,
  },
  {
    path: '**',
    redirectTo: getFirstFeature(),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'ignore',
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
