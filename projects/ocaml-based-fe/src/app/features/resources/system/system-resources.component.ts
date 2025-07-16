import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SystemResourcesService } from './system-resources.service';
import {
  SystemResourcesClose,
  SystemResourcesGetResources,
  SystemResourcesRedrawCharts,
  SystemResourcesSetActiveTime,
} from '@ocfe-resources/system/system-resources.actions';
import { selectActiveNode } from '@ocfe-app/app.state';
import { take } from 'rxjs';
import { AppChangeSubMenus } from '@ocfe-app/app.actions';
import { getMergedRoute, MergedRoute } from '@openmina/shared';
import { Router } from '@angular/router';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { selectSystemResourcesSidePanel } from '@ocfe-resources/system/system-resources.state';

@Component({
    selector: 'mina-system-resources',
    templateUrl: './system-resources.component.html',
    styleUrls: ['./system-resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SystemResourcesComponent extends StoreDispatcher implements OnInit, OnDestroy {

  showSidePanel: boolean;

  constructor(private systemResourcesService: SystemResourcesService,
              private router: Router,
              public el: ElementRef<HTMLElement>) { super(); }

  ngOnInit(): void {
    this.dispatch(AppChangeSubMenus, [Routes.SYSTEM]);
    this.listenToNodeChanging();
    this.listenToRouteChange();
    this.listenToSidePanelChange();
  }

  private listenToNodeChanging(): void {
    this.select(selectActiveNode, () => {
      this.dispatch(SystemResourcesGetResources);
    });
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      this.dispatch(SystemResourcesSetActiveTime, {
        timestamp: Number(route.queryParams['timestamp']),
        resource: this.getResource(route.queryParams['resource'] || 'cpu'),
      });

      if (!route.queryParams['resource']) {
        this.router.navigate(['resources', 'system'], {
          queryParams: { resource: 'cpu' },
          queryParamsHandling: 'merge',
        });
      }
    }, take(1));
  }

  private getResource(queryParam: string): string {
    if (queryParam.includes('storage')) {
      return 'io';
    } else if (queryParam.includes('network')) {
      return 'network';
    }
    return queryParam;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(SystemResourcesClose);
  }

  private listenToSidePanelChange(): void {
    this.select(selectSystemResourcesSidePanel, (show: boolean) => {
      this.showSidePanel = show;
      this.detect();
    });
  }

  onEndResizing(): void {
    this.dispatch(SystemResourcesRedrawCharts);
  }
}
