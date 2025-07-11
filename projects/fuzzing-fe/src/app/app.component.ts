import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MinaState } from '@fufe-app/app.setup';
import {
  APP_TOGGLE_MENU_OPENING,
  APP_TOGGLE_MOBILE,
  AppToggleMenuOpening,
  AppToggleMobile
} from '@fufe-app/app.actions';
import { AppMenu } from '@fufe-shared/types/app/app-menu.type';
import { selectAppMenu } from '@fufe-app/app.state';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ManualDetection, MIN_WIDTH_700 } from '@openmina/shared';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent extends ManualDetection implements OnInit {

  menu: AppMenu = {} as AppMenu;

  constructor(private store: Store<MinaState>,
              private breakpointObserver: BreakpointObserver) { super(); }

  ngOnInit(): void {
    this.listenToCollapsingMenu();
    this.listenToWindowResizing();
  }

  private listenToCollapsingMenu(): void {
    this.store.select(selectAppMenu)
      .subscribe((menu: AppMenu) => {
        this.menu = menu;
        this.detect();
      });
  }

  private listenToWindowResizing(): void {
    this.breakpointObserver
      .observe(MIN_WIDTH_700)
      .subscribe((bs: BreakpointState) => {
        this.store.dispatch<AppToggleMobile>({ type: APP_TOGGLE_MOBILE, payload: { isMobile: !bs.matches } });
      });
  }

  toggleMenu(): void {
    this.store.dispatch<AppToggleMenuOpening>({ type: APP_TOGGLE_MENU_OPENING });
  }
}
