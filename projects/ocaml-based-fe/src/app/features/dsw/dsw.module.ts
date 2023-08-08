import { NgModule } from '@angular/core';

import { DswRouting } from './dsw.routing';
import { DswComponent } from './dsw.component';
import { SharedModule } from '@ocfe-shared/shared.module';


@NgModule({
  declarations: [
    DswComponent,
  ],
  imports: [
    SharedModule,
    DswRouting,
  ],
})
export class DswModule {}
