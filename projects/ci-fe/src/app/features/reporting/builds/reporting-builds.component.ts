import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StoreDispatcher } from '@cife-shared/base-classes/store-dispatcher.class';
import { HorizontalResizableContainerComponent } from '@cife-shared/components/horizontal-resizable-container/horizontal-resizable-container.component';
import { ReportingBuildsClose, ReportingBuildsGetReports, ReportingBuildsMarkReportToShow } from '@cife-reporting/builds/reporting-builds.actions';
import { Report } from '@cife-shared/types/reporting/report.type';
import { getMergedRoute } from '@cife-shared/router/router-state.selectors';
import { MergedRoute } from '@cife-shared/router/merged-route';
import { filter, take } from 'rxjs';
import { ReportingBuildsTableComponent } from '@cife-reporting/builds/reporting-builds-table/reporting-builds-table.component';
import { selectReportingBuildsActiveReport } from './reporting-builds.state';

@Component({
  selector: 'mina-reporting-builds',
  templateUrl: './reporting-builds.component.html',
  styleUrls: ['./reporting-builds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportingBuildsComponent extends StoreDispatcher implements OnInit, OnDestroy {

  isActiveRow: boolean;

  private removedClass: boolean;

  @ViewChild(ReportingBuildsTableComponent, { read: ElementRef }) private tableRef: ElementRef<HTMLElement>;
  @ViewChild(HorizontalResizableContainerComponent, { read: ElementRef }) private horizontalResizableContainer: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.dispatch(ReportingBuildsGetReports);
    this.listenToRouteChange();
    this.listenToActiveRowChange();
  }

  toggleResizing(): void {
    this.tableRef.nativeElement.classList.toggle('no-transition');
  }

  onWidthChange(width: number): void {
    this.horizontalResizableContainer.nativeElement.style.right = (width * -1) + 'px';
    this.tableRef.nativeElement.style.width = `calc(100% - ${width}px)`;
  }

  private listenToActiveRowChange(): void {
    this.select(selectReportingBuildsActiveReport, (row: Report) => {
      if (row && !this.isActiveRow) {
        this.isActiveRow = true;
        if (!this.removedClass) {
          this.removedClass = true;
          this.horizontalResizableContainer.nativeElement.classList.remove('no-transition');
        }
        this.detect();
      } else if (!row && this.isActiveRow) {
        this.isActiveRow = false;
        this.detect();
      }
    });
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      this.dispatch(ReportingBuildsMarkReportToShow, Number(route.params['id']));
    }, take(1), filter((route: MergedRoute) => !!route.params['id']));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(ReportingBuildsClose);
  }
}
