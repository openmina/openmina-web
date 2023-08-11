import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { getMergedRoute, HorizontalMenuComponent, MergedRoute, removeParamsFromURL } from '@openmina/shared';
import { selectActiveNode, selectAppMenu } from '@ocfe-app/app.state';
import { untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, filter } from 'rxjs';
import { CONFIG, getAvailableFeatures } from '@ocfe-shared/constants/config';
import { FeatureType, MinaNode } from '@ocfe-shared/types/core/environment/mina-env.type';
import { AppMenu } from '@ocfe-shared/types/app/app-menu.type';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
  selector: 'mina-submenu-tabs',
  templateUrl: './submenu-tabs.component.html',
  styleUrls: ['./submenu-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fx-row-vert-cent flex-grow' },
})
export class SubmenuTabsComponent extends StoreDispatcher implements OnInit {

  subMenus: string[] = [];
  isMobile: boolean;
  baseRoute: string;
  activeSubMenu: string;
  activeNodeName: string;

  @ViewChild(HorizontalMenuComponent) private horizontalMenuComponent: HorizontalMenuComponent;

  ngOnInit(): void {
    this.listenToRouteChange();
    this.listenToMenuChange();
  }

  private listenToRouteChange(): void {
    combineLatest([
      this.store.select(selectActiveNode),
      this.store.select(getMergedRoute).pipe(filter(Boolean)),
    ])
      .pipe(
        untilDestroyed(this),
        debounceTime(100),
      )
      .subscribe((response: [MinaNode, MergedRoute]) => {
        const route = response[1];
        this.baseRoute = removeParamsFromURL(route.url.split('/')[1]);
        this.activeSubMenu = removeParamsFromURL(route.url.split('/')[2]);
        this.activeNodeName = route.queryParams['node'];

        this.setSubMenusOfActiveNodeForNewPage(response[0]);
        this.detect();
        this.horizontalMenuComponent.checkView();
      });
  }

  private setSubMenusOfActiveNodeForNewPage(node: MinaNode): void {
    const feature = getAvailableFeatures(node || {} as any).find((f: FeatureType) => f === this.baseRoute);
    if (node && node.features) {
      this.subMenus = node.features[feature] || [];
    } else {
      this.subMenus = CONFIG.globalConfig?.features[feature] || [];
    }
  }

  // features() {
  //   return {
  //     dashboard: ['nodes', 'topology'],
  //     explorer: ['blocks', 'transactions', 'snark-pool', 'scan-state', 'snark-traces'],
  //     resources: ['system'],
  //     network: ['messages', 'connections', 'blocks', 'blocks-ipc'],
  //     tracing: ['overview', 'blocks'],
  //     benchmarks: CONFIG.production ? ['wallets'] : ['wallets', 'transactions'],
  //     storage: ['accounts'],
  //     'web-node': ['wallet', 'peers', 'logs', 'state'],
  //   };
  // }

  private listenToMenuChange(): void {
    this.select(selectAppMenu, (menu: AppMenu) => {
      this.isMobile = menu.isMobile;
      this.detect();
    }, filter(menu => menu.isMobile !== this.isMobile));
  }

}
