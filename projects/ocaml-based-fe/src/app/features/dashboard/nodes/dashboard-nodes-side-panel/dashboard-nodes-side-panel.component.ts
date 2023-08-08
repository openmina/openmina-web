import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BlockStructuredTraceComponent } from '@ocfe-shared/components/block-structured-trace/block-structured-trace.component';
import { TracingTraceGroup } from '@ocfe-shared/types/tracing/blocks/tracing-trace-group.type';
import { selectDashboardNodesActiveNode, selectDashboardNodesBlockTraces } from '@ocfe-dashboard/nodes/dashboard-nodes.state';
import { DashboardNodesSetActiveNode } from '@ocfe-dashboard/nodes/dashboard-nodes.actions';
import { filter } from 'rxjs';
import { DashboardNode } from '@ocfe-shared/types/dashboard/nodes/dashboard-node.type';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { Router } from '@angular/router';

@Component({
  selector: 'mina-dashboard-nodes-side-panel',
  templateUrl: './dashboard-nodes-side-panel.component.html',
  styleUrls: ['./dashboard-nodes-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column h-100' },
})
export class DashboardNodesSidePanelComponent extends StoreDispatcher implements OnInit {

  title: string;

  @ViewChild('traces', { read: ViewContainerRef })
  private blockStructuredTrace: ViewContainerRef;
  private component: BlockStructuredTraceComponent;

  constructor(private router: Router) { super(); }

  async ngOnInit(): Promise<void> {
    await import('@ocfe-shared/components/block-structured-trace/block-structured-trace.component').then(c => {
      this.component = this.blockStructuredTrace.createComponent<BlockStructuredTraceComponent>(c.BlockStructuredTraceComponent).instance;
    });
    this.listenToActiveTraceChange();
  }

  private listenToActiveTraceChange(): void {
    this.select(selectDashboardNodesActiveNode, (activeNode: DashboardNode) => {
      this.title = `${activeNode.source} Transition ${activeNode.blockchainLength} - ${activeNode.traceStatus}`;
      this.component.detect();
      this.detect();
    }, filter(Boolean));
    this.select(selectDashboardNodesBlockTraces, (groups: TracingTraceGroup[]) => {
      this.component.checkpoints = groups[0]?.checkpoints;
      if (this.component.allExpanded) {
        this.component.expandAll();
      }
      this.component.detect();
    });
  }

  closeSidePanel(): void {
    this.dispatch(DashboardNodesSetActiveNode);
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: { name: undefined },
    });
  }
}
