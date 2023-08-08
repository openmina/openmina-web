import { NgModule } from '@angular/core';

import { DashboardRouting } from './dashboard.routing';
import { DashboardComponent } from '@ocfe-dashboard/dashboard.component';
import { SharedModule } from '@ocfe-shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    DashboardRouting,
  ],
})
export class DashboardModule {}
