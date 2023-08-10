import { NgModule } from '@angular/core';
import { OpenminaEagerSharedModule } from './openmina-eager-shared.module';
import { ReactiveFormsModule } from '@angular/forms';


const MODULES = [
  OpenminaEagerSharedModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ]
})
export class OpenminaSharedModule {}
