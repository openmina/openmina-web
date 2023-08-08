import { NgModule } from '@angular/core';

import { NetworkBlocksIpcRouting } from './network-blocks-ipc.routing';
import { NetworkBlocksIpcComponent } from './network-blocks-ipc.component';
import { NetworkBlocksIpcTableComponent } from './network-blocks-ipc-table/network-blocks-ipc-table.component';
import { NetworkBlocksIpcToolbarComponent } from './network-blocks-ipc-toolbar/network-blocks-ipc-toolbar.component';
import { NetworkBlocksIpcSidePanelComponent } from './network-blocks-ipc-side-panel/network-blocks-ipc-side-panel.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NetworkBlocksIpcEffects } from '@ocfe-network/blocks-ipc/network-blocks-ipc.effects';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';
import { HorizontalResizableContainerComponent } from '@ocfe-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';


@NgModule({
  declarations: [
    NetworkBlocksIpcComponent,
    NetworkBlocksIpcTableComponent,
    NetworkBlocksIpcToolbarComponent,
    NetworkBlocksIpcSidePanelComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    NetworkBlocksIpcRouting,
    EffectsModule.forFeature([NetworkBlocksIpcEffects]),
    HorizontalResizableContainerComponent,
  ],
})
export class NetworkBlocksIpcModule {}

