import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectDswWorkPoolActiveWorkPoolDetail } from '@rufe-snarks/work-pool/dsw-work-pool.state';
import { WorkPoolDetail } from '@rufe-shared/types/snarks/work-pool/work-pool-detail.type';

@Component({
  selector: 'mina-dsw-work-pool-details-overview',
  templateUrl: './dsw-work-pool-details-overview.component.html',
  styleUrls: ['./dsw-work-pool-details-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswWorkPoolDetailsOverviewComponent extends StoreDispatcher implements OnInit {

  activeWorkPool: WorkPoolDetail;

  ngOnInit(): void {
    this.select(selectDswWorkPoolActiveWorkPoolDetail, (detail: WorkPoolDetail) => {
      this.activeWorkPool = detail;
      this.detect();
    });
  }
}
