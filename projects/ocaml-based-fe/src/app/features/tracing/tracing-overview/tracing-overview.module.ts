import { NgModule } from '@angular/core';
import { TracingOverviewComponent } from './tracing-overview.component';
import { TracingOverviewRouting } from '@ocfe-tracing/tracing-overview/tracing-overview.routing';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TracingOverviewEffects } from '@ocfe-tracing/tracing-overview/tracing-overview.effects';
import { TracingOverviewGraphListComponent } from './tracing-overview-graph-list/tracing-overview-graph-list.component';
import { TracingOverviewToolbarComponent } from './tracing-overview-toolbar/tracing-overview-toolbar.component';
import { FlameTimeGraphComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    TracingOverviewComponent,
    TracingOverviewGraphListComponent,
    TracingOverviewToolbarComponent,
  ],
  imports: [
    SharedModule,
    TracingOverviewRouting,
    EffectsModule.forFeature([TracingOverviewEffects]),
    FlameTimeGraphComponent,
  ],
})
export class TracingOverviewModule {}

