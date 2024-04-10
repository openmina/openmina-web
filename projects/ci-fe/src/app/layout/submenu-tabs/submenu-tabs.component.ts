import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { getMergedRoute } from '@cife-shared/router/router-state.selectors';
import { MergedRoute } from '@cife-shared/router/merged-route';
import { StoreDispatcher } from '@cife-shared/base-classes/store-dispatcher.class';
import { filter } from 'rxjs';
import { removeParamsFromURL } from '@openmina/shared';

@UntilDestroy()
@Component({
  selector: 'mina-submenu-tabs',
  templateUrl: './submenu-tabs.component.html',
  styleUrls: ['./submenu-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-xl flex-row flex-grow align-center' },
})
export class SubmenuTabsComponent extends StoreDispatcher implements OnInit {

  subMenus: string[] = ['builds', 'compare', 'trends'];
  activeSubMenu: string;
  isMobile: boolean;

  ngOnInit(): void {
    this.listenToRouteChange();
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (response: MergedRoute) => {
      this.activeSubMenu = removeParamsFromURL(response.url.split('/')[1]);
      this.detect();
    }, filter(Boolean));
  }

}
