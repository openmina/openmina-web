import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerTransactionsComponent } from '@ocfe-explorer/transactions/explorer-transactions.component';
import { EXPLORER_TITLE } from '@ocfe-app/app.routing';
import { ExplorerTransactionsNewComponent } from '@ocfe-explorer/transactions/explorer-transactions-new/explorer-transactions-new.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorerTransactionsComponent,
  },
  {
    path: 'new',
    component: ExplorerTransactionsNewComponent,
    title: EXPLORER_TITLE,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorerTransactionsRouting {}
