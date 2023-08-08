import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { selectAppMenu } from '@ocfe-app/app.state';
import { TooltipService } from '@ocfe-shared/services/tooltip.service';
import { ManualDetection } from '@ocfe-shared/base-classes/manual-detection.class';
import { LoadingEvent } from '@ocfe-shared/types/core/loading/loading-event.type';
import { AppMenu } from '@ocfe-shared/types/app/app-menu.type';
import { APP_TOGGLE_MENU_OPENING, AppToggleMenuOpening } from '@ocfe-app/app.actions';
import { selectLoadingStateLength } from '@ocfe-app/layout/toolbar/loading.reducer';
import { getMergedRoute } from '@ocfe-shared/router/router-state.selectors';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { CONFIG } from '@ocfe-shared/constants/config';

@Component({
  selector: 'mina-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-row align-center border-bottom' },
})
export class ToolbarComponent extends ManualDetection implements OnInit {

  title: string = 'Loading';
  definiteLoading: LoadingEvent;
  isMobile: boolean;
  switchForbidden: boolean;

  @ViewChild('loadingRef') private loadingRef: ElementRef<HTMLDivElement>;

  constructor(private router: Router,
              private store: Store<MinaState>,
              private tooltipService: TooltipService) { super(); }

  ngOnInit(): void {
    this.listenToTitleChange();
    this.listenToMenuChange();
    this.listenToLoading();
    this.listenToRouterChange();
  }

  private listenToLoading(): void {
    const displayNone: string = 'd-none';
    const classList = this.loadingRef.nativeElement.classList;

    this.store.select(selectLoadingStateLength)
      .subscribe((length: number) => {
        if (length > 0) {
          classList.remove(displayNone);
        } else {
          classList.add(displayNone);
        }
      });
  }

  private listenToMenuChange(): void {
    this.store.select(selectAppMenu)
      .pipe(filter(menu => menu.isMobile !== this.isMobile))
      .subscribe((menu: AppMenu) => {
        this.isMobile = menu.isMobile;
        this.detect();
      });
  }

  private listenToTitleChange(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          while (route!.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data[Object.getOwnPropertySymbols(route.snapshot.data)[0]];
        }),
      )
      .subscribe((title: string) => {
        if (title) {
          this.title = title.split('- ')[1];
          this.buildSwitchForbidden();
          this.detect();
        }
      });
  }

  toggleTooltips(): void {
    this.tooltipService.toggleTooltips();
  }

  toggleMenu(): void {
    this.store.dispatch<AppToggleMenuOpening>({ type: APP_TOGGLE_MENU_OPENING });
  }

  private listenToRouterChange(): void {
    this.store.select(getMergedRoute)
      .subscribe(() => {
        this.buildSwitchForbidden();
        this.detect();
      });
  }

  private buildSwitchForbidden(): void {
    this.switchForbidden = location.pathname.includes(Routes.DASHBOARD);
  }
}
