import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnarksRouting } from './snarks.routing';
import { SnarksComponent } from './snarks.component';
import { SharedModule } from '@rufe-shared/shared.module';


@NgModule({
  declarations: [
    SnarksComponent
  ],
  imports: [
    SharedModule,
    SnarksRouting
  ]
})
export class SnarksModule { }
