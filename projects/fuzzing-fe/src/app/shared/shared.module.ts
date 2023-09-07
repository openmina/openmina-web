import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReactiveFormsModule } from '@angular/forms';
import { EagerSharedModule } from './eager-shared.module';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { OpenminaSharedModule } from '@openmina/shared';


const PIPES = [
  SafeHtmlPipe,
];

const MODULES = [
  EagerSharedModule,
  ScrollingModule,
  MatExpansionModule,
  ClipboardModule,
  ReactiveFormsModule,
  OpenminaSharedModule,
];

@NgModule({
  declarations: [
    ...PIPES,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...PIPES,
  ],
})
export class SharedModule {}
