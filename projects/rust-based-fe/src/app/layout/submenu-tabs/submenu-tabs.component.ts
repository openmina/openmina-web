import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { getMergedRoute, HorizontalMenuComponent, MergedRoute, removeParamsFromURL } from '@openmina/shared';
import { selectActiveNode, selectAppMenu } from '@rufe-app/app.state';
import { untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, filter } from 'rxjs';
import { CONFIG, getAvailableFeatures } from '@rufe-shared/constants/config';
import { FeatureType, MinaNode } from '@rufe-shared/types/core/environment/mina-env.type';
import { AppMenu } from '@rufe-shared/types/app/app-menu.type';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';

interface SubMenu {
  name: string;
  route: string;
}

@Component({
    selector: 'mina-submenu-tabs',
    templateUrl: './submenu-tabs.component.html',
    styleUrls: ['./submenu-tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'fx-row-vert-cent flex-grow' },
    standalone: false
})
export class SubmenuTabsComponent extends StoreDispatcher implements OnInit {

  subMenus: SubMenu[] = [];
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
      this.subMenus = this.getSubMenusMap(node.features[feature]) || [];
    } else {
      this.subMenus = this.getSubMenusMap(CONFIG.globalConfig?.features[feature]) || [];
    }
  }

  private getSubMenusMap(features: string[]): SubMenu[] {
    return features.map((feature: string) => {
      switch (feature) {
        default:
          return { name: feature.split('-').join(' '), route: feature }
      }
    });
  }

  private listenToMenuChange(): void {
    this.select(selectAppMenu, (menu: AppMenu) => {
      this.isMobile = menu.isMobile;
      this.detect();
    }, filter(menu => menu.isMobile !== this.isMobile));
  }

}
