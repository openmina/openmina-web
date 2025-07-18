import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import {
  DashboardNodesGetForks,
  DashboardNodesSetActiveBlock,
  DashboardNodesToggleFilter,
  DashboardNodesToggleLatency,
  DashboardNodesToggleNodesShowing,
} from '@ocfe-dashboard/nodes/dashboard-nodes.actions';
import {
  selectDashboardNodesActiveBlockLevel,
  selectDashboardNodesActiveFilters,
  selectDashboardNodesActiveForkFilter,
  selectDashboardNodesAllFilters,
  selectDashboardNodesEarliestBlockLevel,
  selectDashboardNodesForks,
  selectDashboardNodesLatencyFromFastest,
  selectDashboardNodesNodeCount,
  selectDashboardNodesNumOfNodes,
  selectDashboardNodesRemainingRequests,
  selectDashboardNodesShowOfflineNodes,
} from '@ocfe-dashboard/nodes/dashboard-nodes.state';
import { DashboardNodeCount } from '@ocfe-shared/types/dashboard/nodes/dashboard-node-count.type';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { DashboardForkFilter } from '@ocfe-shared/types/dashboard/nodes/dashboard-fork-filter.type';
import { CONFIG } from '@ocfe-shared/constants/config';

@Component({
    selector: 'mina-dashboard-nodes-toolbar',
    templateUrl: './dashboard-nodes-toolbar.component.html',
    styleUrls: ['./dashboard-nodes-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column border-bottom' },
    standalone: false
})
export class DashboardNodesToolbarComponent extends StoreDispatcher implements OnInit {

  readonly nodeLister = CONFIG.nodeLister;
  count: DashboardNodeCount = {} as DashboardNodeCount;
  nodesLength: number;
  activeFilters: string[] = [];
  allFilters: string[] = [];
  activeSlot: number;
  earliestSlot: number;
  showOffline: boolean = true;
  latencyFromFastest: boolean = true;
  isLoading: boolean = true;
  forks: DashboardForkFilter[];
  activeForkFilter: { value: string, type: 'branch' | 'bestTip' };
  currentSlotIsTooBig: boolean = false;

  @HostBinding('style.height.px')
  height: number = this.nodeLister ? 40 : 80;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    this.listenToNode();
    this.listenToFiltersChanges();
    this.listenToActiveBlockChanges();
  }

  private listenToNode(): void {
    this.select(selectDashboardNodesNumOfNodes, (nodesLength: number) => {
      this.nodesLength = nodesLength;
    });
    this.select(selectDashboardNodesShowOfflineNodes, (show: boolean) => {
      this.showOffline = show;
      this.detect();
    });
    this.select(selectDashboardNodesRemainingRequests, (remaining: number) => {
      if (this.isLoading && remaining === 0) {
        this.isLoading = false;
        this.dispatch(DashboardNodesGetForks);
        this.detect();
      } else if (!this.isLoading && remaining > 0) {
        this.isLoading = true;
        this.detect();
      }
    });
    this.select(selectDashboardNodesLatencyFromFastest, (latencyFromFastest: boolean) => {
      this.latencyFromFastest = latencyFromFastest;
      this.detect();
    });
    this.select(selectDashboardNodesNodeCount, (count: DashboardNodeCount) => {
      this.count = count;
      this.detect();
    });
    this.select(selectDashboardNodesForks, (forks: DashboardForkFilter[]) => {
      this.forks = forks;
      this.detect();
    });
  }

  toggleNodesShowing(): void {
    this.dispatch(DashboardNodesToggleNodesShowing);
  }

  toggleShowLatencyFromFastest(): void {
    this.dispatch(DashboardNodesToggleLatency);
  }

  private listenToFiltersChanges(): void {
    this.select(selectDashboardNodesAllFilters, (filters: string[]) => {
      this.allFilters = filters;
      this.detect();
    });
    this.select(selectDashboardNodesActiveFilters, (filters: string[]) => {
      this.activeFilters = filters;
      this.detect();
    });
    this.select(selectDashboardNodesActiveForkFilter, (filter) => {
      this.activeForkFilter = filter;
      this.detect();
    });
  }

  private listenToActiveBlockChanges(): void {
    this.select(selectDashboardNodesActiveBlockLevel, (slot: number) => {
      this.activeSlot = slot;
      this.toggleHeightMismatching();
      this.detect();
    });

    this.select(selectDashboardNodesEarliestBlockLevel, (earliestSlot: number) => {
      this.earliestSlot = earliestSlot;
      this.toggleHeightMismatching();
      this.detect();
    }, filter(Boolean), filter(earliestSlot => this.earliestSlot !== earliestSlot));
  }

  private toggleHeightMismatching(): void {
    if (this.activeSlot > this.earliestSlot && !this.currentSlotIsTooBig) {
      this.currentSlotIsTooBig = true;
      this.detect();
    } else if (this.currentSlotIsTooBig) {
      if (this.activeSlot <= this.earliestSlot) {
        this.currentSlotIsTooBig = false;
      }
      this.detect();
    }
  }

  toggleFilter(filter: { value: string, type: 'branch' | 'bestTip' }): void {
    this.dispatch(DashboardNodesToggleFilter, filter);
  }

  getBlock(height: number): void {
    this.dispatch(DashboardNodesSetActiveBlock, { height });
    this.router.navigate([Routes.DASHBOARD, Routes.NODES, height], { queryParamsHandling: 'merge' });
  }
}
