import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { HorizontalResizeDirective } from './directives/horizontal-resize.directive';
import {
  HorizontalResizableContainerComponent
} from './components/horizontal-resizable-container/horizontal-resizable-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EagerSharedModule } from '@cife-shared/eager-shared.module';
import { OpenminaEagerSharedModule, OpenminaSharedModule } from '@openmina/shared';


const COMPONENTS = [
  HorizontalResizableContainerComponent,
];

const DIRECTIVES = [
  HorizontalResizeDirective,
];

const MODULES = [
  EagerSharedModule,
  ScrollingModule,
  MatExpansionModule,
  ClipboardModule,
  MatTabsModule,
  NgxJsonViewerModule,
  ReactiveFormsModule,
  OpenminaSharedModule,
  OpenminaEagerSharedModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}

