import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenchmarksWalletsComponent } from './benchmarks-wallets.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { BenchmarksWalletsEffects } from '@ocfe-benchmarks/wallets/benchmarks-wallets.effects';
import { BenchmarksWalletsTableComponent } from '@ocfe-benchmarks/wallets/benchmarks-wallets-table/benchmarks-wallets-table.component';
import { BenchmarksWalletsToolbarComponent } from '@ocfe-benchmarks/wallets/benchmarks-wallets-toolbar/benchmarks-wallets-toolbar.component';
import { BenchmarksWalletsRouting } from '@ocfe-benchmarks/wallets/benchmarks-wallets.routing';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { HorizontalMenuComponent } from '@ocfe-shared/components/horizontal-menu/horizontal-menu.component';


@NgModule({
  declarations: [
    BenchmarksWalletsComponent,
    BenchmarksWalletsTableComponent,
    BenchmarksWalletsToolbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CopyComponent,
    BenchmarksWalletsRouting,
    EffectsModule.forFeature([BenchmarksWalletsEffects]),
    HorizontalMenuComponent,
  ],
})
export class BenchmarksWalletsModule {}
