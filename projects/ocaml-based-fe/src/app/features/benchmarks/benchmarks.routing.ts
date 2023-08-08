import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenchmarksComponent } from '@ocfe-benchmarks/benchmarks.component';
import { BENCHMARKS_TITLE } from '@ocfe-app/app.routing';

const routes: Routes = [
  {
    path: '',
    component: BenchmarksComponent,
    children: [
      {
        path: 'wallets',
        loadChildren: () => import('./wallets/benchmarks-wallets.module').then(m => m.BenchmarksWalletsModule),
        title: BENCHMARKS_TITLE,
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/benchmarks-transactions.module').then(m => m.BenchmarksTransactionsModule),
        title: BENCHMARKS_TITLE,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'wallets',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenchmarksRouting {}
