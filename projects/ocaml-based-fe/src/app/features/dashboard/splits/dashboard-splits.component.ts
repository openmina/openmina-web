import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { DashboardSplitsClose, DashboardSplitsGetSplits } from '@ocfe-dashboard/splits/dashboard-splits.actions';
import { selectDashboardSplitsOpenSidePanel } from '@ocfe-dashboard/splits/dashboard-splits.state';

@Component({
    selector: 'mina-splits',
    templateUrl: './dashboard-splits.component.html',
    styleUrls: ['./dashboard-splits.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column h-100 w-100' },
    standalone: false
})
export class DashboardSplitsComponent extends StoreDispatcher implements OnInit, OnDestroy {

  show: boolean = true;

  ngOnInit(): void {
    this.listenToSidePanelChanges();
    this.dispatch(DashboardSplitsGetSplits);
  }

  private listenToSidePanelChanges(): void {
    this.select(selectDashboardSplitsOpenSidePanel, (show: boolean) => {
      this.show = show;
      this.detect();
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(DashboardSplitsClose);
  }
}
