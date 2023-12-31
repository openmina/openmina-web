import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectDswDashboardActiveNode } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.state';
import { DswDashboardClose, DswDashboardGetNodes } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.actions';
import { timer } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'mina-dsw-dashboard',
  templateUrl: './dsw-dashboard.component.html',
  styleUrls: ['./dsw-dashboard.component.scss'],
  host: { class: 'flex-column h-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswDashboardComponent extends StoreDispatcher implements OnInit, OnDestroy {

  isActiveRow: boolean;

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    timer(0, 10000).pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      this.dispatch(DswDashboardGetNodes)
    });
    this.listenToSidePanelChange();
  }

  private listenToSidePanelChange(): void {
    this.select(selectDswDashboardActiveNode, node => {
      if (node && !this.isActiveRow) {
        this.isActiveRow = true;
        this.detect();
      } else if (!node && this.isActiveRow) {
        this.isActiveRow = false;
        this.detect();
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(DswDashboardClose);
  }
}
