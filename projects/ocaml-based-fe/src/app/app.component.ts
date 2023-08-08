import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { APP_TOGGLE_MENU_OPENING, APP_TOGGLE_MOBILE, AppToggleMenuOpening, AppToggleMobile } from '@ocfe-app/app.actions';
import { ManualDetection } from '@ocfe-shared/base-classes/manual-detection.class';
import { AppMenu } from '@ocfe-shared/types/app/app-menu.type';
import { selectAppMenu } from '@ocfe-app/app.state';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MAX_WIDTH_700 } from '@ocfe-shared/constants/breakpoint-observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block h-100 w-100' },
})
export class AppComponent extends ManualDetection implements OnInit {

  menu: AppMenu = {} as AppMenu;

  constructor(private store: Store<MinaState>,
              private breakpointObserver: BreakpointObserver) {
    super();
    if ((window as any).Cypress) {
      (window as any).store = store;
    }
  }

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
      .observe(MAX_WIDTH_700)
      .subscribe((bs: BreakpointState) => {
        this.store.dispatch<AppToggleMobile>({ type: APP_TOGGLE_MOBILE, payload: { isMobile: bs.matches } });
      });
  }

  toggleMenu(): void {
    this.store.dispatch<AppToggleMenuOpening>({ type: APP_TOGGLE_MENU_OPENING });
  }
}
