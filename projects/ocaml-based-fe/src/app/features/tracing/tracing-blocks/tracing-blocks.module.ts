import { NgModule } from '@angular/core';

import { TracingBlocksRouting } from './tracing-blocks.routing';
import { TracingBlocksComponent } from './tracing-blocks.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TracingBlocksEffects } from '@ocfe-tracing/tracing-blocks/tracing-blocks.effects';
import { TracingBlocksTableComponent } from '@ocfe-tracing/tracing-blocks/tracing-blocks-table/tracing-blocks-table.component';
import { TracingBlocksSidePanelComponent } from '@ocfe-tracing/tracing-blocks/tracing-blocks-side-panel/tracing-blocks-side-panel.component';
import { CopyComponent, HorizontalResizableContainerComponent, MinaJsonViewerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    TracingBlocksComponent,
    TracingBlocksTableComponent,
    TracingBlocksSidePanelComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    MinaJsonViewerComponent,
    EffectsModule.forFeature([TracingBlocksEffects]),
    TracingBlocksRouting,
    HorizontalResizableContainerComponent,
  ],
})
export class TracingBlocksModule {}
