import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenminaEagerSharedModule, OpenminaSharedModule } from '@openmina/shared';
import { CommonModule } from '@angular/common';


const MODULES = [
  CommonModule,
  OpenminaEagerSharedModule,
  OpenminaSharedModule,
  MatExpansionModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ],
})
export class SharedModule {}
