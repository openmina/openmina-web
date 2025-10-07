import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TracingOverviewCheckpoint } from '@ocfe-shared/types/tracing/overview/tracing-overview-checkpoint.type';
import { selectTracingOverviewCheckpoints, selectTracingOverviewCondensedView } from '@ocfe-tracing/tracing-overview/tracing-overview.state';
import { selectAppMenu } from '@ocfe-app/app.state';
import { AppMenu } from '@ocfe-shared/types/app/app-menu.type';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
    selector: 'mina-tracing-overview-graph-list',
    templateUrl: './tracing-overview-graph-list.component.html',
    styleUrls: ['./tracing-overview-graph-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column' },
    standalone: false
})
export class TracingOverviewGraphListComponent extends StoreDispatcher implements OnInit {

  checkpoints: TracingOverviewCheckpoint[];
  condensedView: boolean;
  menuCollapsed: boolean;

  ngOnInit(): void {
    this.listenToCheckpointChanges();
    this.listenToCondensedViewChange();
    this.listenToMenuCollapsing();
  }

  private listenToCheckpointChanges(): void {
    this.select(selectTracingOverviewCheckpoints, (checkpoints: TracingOverviewCheckpoint[]) => {
      this.checkpoints = checkpoints;
      this.detect();
    });
  }

  private listenToCondensedViewChange(): void {
    this.select(selectTracingOverviewCondensedView, (condensedView: boolean) => {
      this.condensedView = condensedView;
      this.detect();
    });
  }

  private listenToMenuCollapsing(): void {
    this.select(selectAppMenu, (menu: AppMenu) => {
      this.menuCollapsed = menu.collapsed;
      this.detect();
    });
  }
}
