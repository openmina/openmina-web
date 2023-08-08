import { NgModule } from '@angular/core';

import { ExplorerSnarksTableComponent } from './explorer-snarks-table/explorer-snarks-table.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { ExplorerSnarksComponent } from '@ocfe-explorer/snarks/explorer-snarks.component';
import { ExplorerSnarksRouting } from '@ocfe-explorer/snarks/explorer-snarks.routing';
import { CopyComponent } from '@ocfe-shared/components/copy/copy.component';


@NgModule({
  declarations: [
    ExplorerSnarksComponent,
    ExplorerSnarksTableComponent,
  ],
  imports: [
    SharedModule,
    CopyComponent,
    ExplorerSnarksRouting,
  ],
})
export class SnarksModule {}
