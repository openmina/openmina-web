import { NgModule } from '@angular/core';
import { ReportingDetailComponent } from '@cife-reporting/shared/reporting-detail/reporting-detail.component';
import {
  ReportingDetailActiveBlockComponent,
} from '@cife-reporting/shared/reporting-detail-active-block/reporting-detail-active-block.component';
import { ReportingDetailBlockListComponent } from '@cife-reporting/shared/reporting-detail-block-list/reporting-detail-block-list.component';
import { SharedModule } from '@cife-shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ReportingGraphComponent } from '@cife-reporting/shared/reporting-graph/reporting-graph.component';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    ReportingDetailComponent,
    ReportingDetailBlockListComponent,
    ReportingDetailActiveBlockComponent,
    ReportingGraphComponent,
  ],
  imports: [
    SharedModule,
    MatIconModule,
    RouterLink,
  ],
  exports: [
    ReportingDetailComponent,
    ReportingGraphComponent,
    MatIconModule,
  ],
})
export class ReportingSharedModule {}
