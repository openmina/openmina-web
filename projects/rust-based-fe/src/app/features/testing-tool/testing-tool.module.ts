import { NgModule } from '@angular/core';

import { TestingToolRouting } from './testing-tool.routing';
import { TestingToolComponent } from './testing-tool.component';
import { SharedModule } from '@rufe-shared/shared.module';


@NgModule({
  declarations: [
    TestingToolComponent
  ],
  imports: [
    SharedModule,
    TestingToolRouting
  ]
})
export class TestingToolModule {}
