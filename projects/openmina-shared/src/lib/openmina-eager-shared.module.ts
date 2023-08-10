import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MinaTooltipDirective } from './directives/mina-tooltip.directive';
import { CopyToClipboardDirective } from './directives/copy-to-clipboard.directive';

const EAGER_MODULES = [
  CommonModule,
  OverlayModule,
];

const EAGER_DIRECTIVES = [
  ClickOutsideDirective,
  MinaTooltipDirective,
  CopyToClipboardDirective,
];


/* The role of this module is to eagerly load all shared parts that are also required by app.component */
@NgModule({
  imports: [
    ...EAGER_MODULES,
  ],
  exports: [
    ...EAGER_MODULES,
    ...EAGER_DIRECTIVES,
  ],
  declarations: [
    ...EAGER_DIRECTIVES,
  ],
})
export class OpenminaEagerSharedModule {}
