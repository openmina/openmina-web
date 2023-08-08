import { NgModule } from '@angular/core';
import { ExplorerScanStateListComponent } from './explorer-scan-state-list/explorer-scan-state-list.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { ExplorerScanStateRouting } from '@ocfe-explorer/scan-state/explorer-scan-state.routing';
import { ExplorerScanStateComponent } from '@ocfe-explorer/scan-state/explorer-scan-state.component';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerScanStateEffects } from '@ocfe-explorer/scan-state/explorer-scan-state.effects';
import { ExplorerScanStateToolbarComponent } from './explorer-scan-state-toolbar/explorer-scan-state-toolbar.component';
import { HorizontalMenuComponent } from '@ocfe-shared/components/horizontal-menu/horizontal-menu.component';
import { ScanStateChartComponent } from './scan-state-chart/scan-state-chart.component';
import { ExplorerScanStateChartListComponent } from './explorer-scan-state-chart-list/explorer-scan-state-chart-list.component';


@NgModule({
  declarations: [
    ExplorerScanStateListComponent,
    ExplorerScanStateComponent,
    ExplorerScanStateToolbarComponent,
    ScanStateChartComponent,
    ExplorerScanStateChartListComponent,
  ],
  imports: [
    SharedModule,
    ExplorerScanStateRouting,
    EffectsModule.forFeature(ExplorerScanStateEffects),
    HorizontalMenuComponent,
  ],
})
export class ExplorerScanStateModule {}
