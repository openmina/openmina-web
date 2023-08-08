import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenchmarksTransactionsRouting } from './benchmarks-transactions.routing';
import { SharedModule } from '@ocfe-shared/shared.module';
import { BenchmarksTransactionsTableComponent } from '@ocfe-benchmarks/transactions/benchmarks-transactions-table/benchmarks-transactions-table.component';
import { BenchmarksTransactionsComponent } from '@ocfe-benchmarks/transactions/benchmarks-transactions.component';
import { EffectsModule } from '@ngrx/effects';
import { BenchmarksTransactionsEffects } from '@ocfe-benchmarks/transactions/benchmarks-transactions.effects';


@NgModule({
  declarations: [
    BenchmarksTransactionsTableComponent,
    BenchmarksTransactionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BenchmarksTransactionsRouting,
    EffectsModule.forFeature([BenchmarksTransactionsEffects]),
  ],
})

export class BenchmarksTransactionsModule {}
