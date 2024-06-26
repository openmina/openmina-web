import { NgModule } from '@angular/core';

import { SnarksWorkPoolRouting } from './snarks-work-pool.routing';
import { SnarksWorkPoolComponent } from './snarks-work-pool.component';
import { SnarksWorkPoolTableComponent } from '@rufe-snarks/work-pool/snarks-work-pool-table/snarks-work-pool-table.component';
import { SnarksWorkPoolSidePanelComponent } from '@rufe-snarks/work-pool/snarks-work-pool-side-panel/snarks-work-pool-side-panel.component';
import { SharedModule } from '@rufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SnarksWorkPoolEffects } from '@rufe-snarks/work-pool/snarks-work-pool.effects';
import { SnarksWorkPoolToolbarComponent } from '@rufe-snarks/work-pool/snarks-work-pool-toolbar/snarks-work-pool-toolbar.component';
import { SnarksWorkPoolStatisticsComponent } from '@rufe-snarks/work-pool/snarks-work-pool-statistics/snarks-work-pool-statistics.component';
import { SnarksWorkPoolDetailsComponent } from '@rufe-snarks/work-pool/snarks-work-pool-details/snarks-work-pool-details.component';
import {
  SnarksWorkPoolDetailsOverviewComponent
} from '@rufe-snarks/work-pool/snarks-work-pool-details-overview/snarks-work-pool-details-overview.component';
import { SnarksWorkPoolDetailsSpecsComponent } from '@rufe-snarks/work-pool/snarks-work-pool-details-specs/snarks-work-pool-details-specs.component';
import {
  SnarksWorkPoolDetailsAccountsComponent
} from '@rufe-snarks/work-pool/snarks-work-pool-details-accounts/snarks-work-pool-details-accounts.component';
import {
  CopyComponent,
  HorizontalMenuComponent,
  HorizontalResizableContainerComponent, JsonConsoleComponent,
  MinaJsonViewerComponent, MinaSidePanelStepperComponent
} from '@openmina/shared';


@NgModule({
  declarations: [
    SnarksWorkPoolComponent,
    SnarksWorkPoolTableComponent,
    SnarksWorkPoolSidePanelComponent,
    SnarksWorkPoolToolbarComponent,
    SnarksWorkPoolStatisticsComponent,
    SnarksWorkPoolDetailsComponent,
    SnarksWorkPoolDetailsOverviewComponent,
    SnarksWorkPoolDetailsSpecsComponent,
    SnarksWorkPoolDetailsAccountsComponent,
  ],
  imports: [
    SnarksWorkPoolRouting,
    SharedModule,
    EffectsModule.forFeature(SnarksWorkPoolEffects),
    HorizontalResizableContainerComponent,
    CopyComponent,
    MinaJsonViewerComponent,
    HorizontalMenuComponent,
    MinaSidePanelStepperComponent,
    JsonConsoleComponent,
  ],
})
export class SnarksWorkPoolModule {}
