import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  selectSystemResourcesActivePoint,
  selectSystemResourcesSidePanelActivePath,
  selectSystemResourcesThreadSort,
} from '@ocfe-resources/system/system-resources.state';
import { SystemResourcesActivePoint } from '@ocfe-shared/types/resources/system/system-resources-active-point.type';
import { filter } from 'rxjs';
import {
  SystemResourcesSetSidePanelActivePath,
  SystemResourcesSortThreads,
  SystemResourcesToggleSidePanel,
} from '@ocfe-resources/system/system-resources.actions';
import { SortDirection, TableColumnList, TableSort } from '@openmina/shared';
import { SystemResourcesPointThread } from '@ocfe-shared/types/resources/system/system-resources-sub-point.type';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { Router } from '@angular/router';

@Component({
    selector: 'mina-system-resources-side-panel',
    templateUrl: './system-resources-side-panel.component.html',
    styleUrls: ['./system-resources-side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'border-left flex-column h-100' },
    standalone: false
})
export class SystemResourcesSidePanelComponent extends StoreDispatcher implements OnInit {

  origin: string = origin;
  activePoint: SystemResourcesActivePoint;
  pathsMap: { name: string, value: number }[];
  activePath: string;
  currentSort: TableSort<SystemResourcesPointThread>;

  readonly tableHeads: TableColumnList<SystemResourcesPointThread> = [
    { name: 'task threads', sort: 'name' },
    { name: 'value' },
  ];

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    this.listenToActivePointChange();
    this.listenToActivePathChange();
    this.listenToSorting();
  }

  private listenToActivePointChange(): void {
    this.select(selectSystemResourcesActivePoint, (point: SystemResourcesActivePoint) => {
      this.activePoint = point;
      this.pathsMap = Object
        .entries(point.point.pathPoints)
        .map(p => ({ name: p[0], value: p[1].value }));
      this.detect();
    }, filter(Boolean));
  }

  private listenToActivePathChange(): void {
    this.select(selectSystemResourcesSidePanelActivePath, (path: string) => {
      this.activePath = path;
      this.detect();
    }, filter(Boolean));
  }

  private listenToSorting(): void {
    this.select(selectSystemResourcesThreadSort, (sort: TableSort<SystemResourcesPointThread>) => {
      this.currentSort = sort;
      this.detect();
    });
  }

  sortTable(sortBy: string): void {
    const sortDirection = sortBy !== this.currentSort.sortBy
      ? this.currentSort.sortDirection
      : this.currentSort.sortDirection === SortDirection.ASC ? SortDirection.DSC : SortDirection.ASC;
    this.dispatch(SystemResourcesSortThreads, { sortBy: sortBy as keyof SystemResourcesPointThread, sortDirection });
  }

  setActivePath(path: string): void {
    this.dispatch(SystemResourcesSetSidePanelActivePath, path);
  }

  closeSidePanel(): void {
    this.dispatch(SystemResourcesToggleSidePanel);
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        resource: null,
        timestamp: null,
      }
    });
  }
}
