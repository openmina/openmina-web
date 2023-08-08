import { NgModule } from '@angular/core';

import { NetworkRoutingModule } from './network.routing';
import { NetworkComponent } from './network.component';
import { SharedModule } from '@ocfe-shared/shared.module';


@NgModule({
  declarations: [
    NetworkComponent,
  ],
  imports: [
    SharedModule,
    NetworkRoutingModule,
  ],
})
export class NetworkModule {}
