import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebNodeStateRouting } from './web-node-state.routing';
import { WebNodeStateComponent } from './web-node-state.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { MinaJsonViewerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    WebNodeStateComponent
  ],
  imports: [
    CommonModule,
    MinaJsonViewerComponent,
    WebNodeStateRouting,
    SharedModule,
  ],
})
export class WebNodeStateModule { }
