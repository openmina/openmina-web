import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { OpenminaEagerSharedModule } from '@openmina/shared';

const EAGER_MODULES = [
  CommonModule,
  MatSidenavModule,
  MatButtonToggleModule,
  OverlayModule,
  OpenminaEagerSharedModule,
];

/* The role of this module is to eagerly load all shared parts that are also required by app.component */
@NgModule({
  imports: [
    ...EAGER_MODULES,
  ],
  exports: [
    ...EAGER_MODULES,
  ],
  declarations: [],
})
export class EagerSharedModule {}
