import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { SizePipe } from './pipes/size.pipe';
import { TruncateMidPipe } from './pipes/truncate-mid.pipe';
import { SecDurationPipe } from './pipes/sec-duration.pipe';
import { ThousandPipe } from '@ocfe-shared/pipes/thousand.pipe';
import { ReadableDatePipe } from '@ocfe-shared/pipes/readable-date.pipe';
import { PluralPipe } from '@ocfe-shared/pipes/plural.pipe';
import { SafeHtmlPipe } from '@ocfe-shared/pipes/safe-html.pipe';
import { OpenminaEagerSharedModule } from '@openmina/shared';


const PIPES = [
  SizePipe,
  TruncateMidPipe,
  SecDurationPipe,
  ThousandPipe,
  ReadableDatePipe,
  PluralPipe,
  SafeHtmlPipe,
];

const MODULES = [
  OpenminaEagerSharedModule,
  MatExpansionModule,
  ReactiveFormsModule,
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
