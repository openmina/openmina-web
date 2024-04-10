import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StoreDispatcher } from '@cife-shared/base-classes/store-dispatcher.class';
import { ReportingDashboardClose, ReportingDashboardGetReports, ReportingDashboardMarkReportToShow } from '@cife-reporting/dashboard/reporting-dashboard.actions';
import { HorizontalResizableContainerComponent } from '@cife-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';
import { Report } from '@cife-shared/types/reporting/report.type';
import { ReportingDashboardGraphListComponent } from '@cife-reporting/dashboard/reporting-dashboard-graph-list/reporting-dashboard-graph-list.component';
import { selectReportingDashboardActiveReport } from '@cife-reporting/dashboard/reporting-dashboard.state';
import { getMergedRoute } from '@cife-shared/router/router-state.selectors';
import { MergedRoute } from '@cife-shared/router/merged-route';
import { filter, take } from 'rxjs';

@Component({
  selector: 'mina-reporting-overview',
  templateUrl: './reporting-dashboard.component.html',
  styleUrls: ['./reporting-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'w-100 h-100 flex-row' },
})
export class ReportingDashboardComponent extends StoreDispatcher implements OnInit, OnDestroy {

  isActivePoint: boolean;

  @ViewChild(ReportingDashboardGraphListComponent, { read: ElementRef }) private graphListRef: ElementRef<HTMLElement>;
  @ViewChild(HorizontalResizableContainerComponent, { read: ElementRef }) private horizontalResizableContainer: ElementRef<HTMLElement>;
  @ViewChild(ReportingDashboardGraphListComponent) private graphList: ReportingDashboardGraphListComponent;

  ngOnInit(): void {
    this.dispatch(ReportingDashboardGetReports);
    this.listenToRouteChange();
    this.listenToActivePointChange();
  }

  onWidthChange(width: number): void {
    if (this.horizontalResizableContainer.nativeElement.style.right) {
      this.redrawGraphs();
    }
    this.horizontalResizableContainer.nativeElement.style.right = (width * -1) + 'px';
    this.graphListRef.nativeElement.style.width = `calc(100% - ${width}px)`;
  }

  private listenToActivePointChange(): void {
    this.select(selectReportingDashboardActiveReport, (report: Report) => {
      if (report && !this.isActivePoint) {
        this.isActivePoint = true;
        this.redrawGraphs();
        this.detect();
      } else if (!report && this.isActivePoint) {
        this.isActivePoint = false;
        this.redrawGraphs();
        this.detect();
      }
    });
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      this.dispatch(ReportingDashboardMarkReportToShow, Number(route.params['id']));
    }, take(1), filter((route: MergedRoute) => !!route.params['id']));
  }

  private redrawGraphs(): void {
    setTimeout(() => {
      this.graphList.graphs.forEach(graph => graph.redrawChart());
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(ReportingDashboardClose);
  }
}
