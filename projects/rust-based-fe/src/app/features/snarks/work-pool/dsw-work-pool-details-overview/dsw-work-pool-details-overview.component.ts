import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectDswWorkPoolActiveWorkPoolDetail } from '@rufe-snarks/work-pool/dsw-work-pool.state';
import { downloadJson, ExpandTracking, MinaJsonViewerComponent } from '@openmina/shared';
import { WorkPoolDetail } from '@rufe-shared/types/dsw/work-pool/work-pool-detail.type';

@Component({
  selector: 'mina-dsw-work-pool-details-overview',
  templateUrl: './dsw-work-pool-details-overview.component.html',
  styleUrls: ['./dsw-work-pool-details-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswWorkPoolDetailsOverviewComponent extends StoreDispatcher implements OnInit {

  activeWorkPool: WorkPoolDetail;
  expandTracking: ExpandTracking = {};
  jsonString: string;

  @ViewChild(MinaJsonViewerComponent) private minaJsonViewer: MinaJsonViewerComponent;

  ngOnInit(): void {
    this.select(selectDswWorkPoolActiveWorkPoolDetail, (detail: WorkPoolDetail) => {
      this.activeWorkPool = detail;
      this.jsonString = JSON.stringify(this.activeWorkPool);
      this.detect();
    });
  }

  downloadJson(): void {
    downloadJson(this.jsonString, 'work-pool.json');
  }

  expandEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(true);
  }

  collapseEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(false);
  }
}
