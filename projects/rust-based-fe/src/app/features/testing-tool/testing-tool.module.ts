import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingToolRouting } from './testing-tool.routing';
import { TestingToolComponent } from './testing-tool.component';


@NgModule({
  declarations: [
    TestingToolComponent
  ],
  imports: [
    CommonModule,
    TestingToolRouting
  ]
})
export class TestingToolModule { }
