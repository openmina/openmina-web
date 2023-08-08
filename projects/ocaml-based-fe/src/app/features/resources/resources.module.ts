import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesComponent } from './resources.component';
import { ResourcesRouting } from '@ocfe-resources/resources.routing';


@NgModule({
  declarations: [
    ResourcesComponent,
  ],
  imports: [
    CommonModule,
    ResourcesRouting,
  ],
})
export class ResourcesModule {}
