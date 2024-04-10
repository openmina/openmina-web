import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { MinaState } from '@fufe-app/app.setup';
import { selectAppMenu } from '@fufe-app/app.state';
import { LoadingService } from '@fufe-core/services/loading.service';
import { LoadingEvent } from '@fufe-shared/types/core/loading/loading-event.type';
import { AppMenu } from '@fufe-shared/types/app/app-menu.type';
import { CONFIG } from '@fufe-shared/constants/config';
import { ManualDetection, ThemeSwitcherService, ThemeType } from '@openmina/shared';

@Component({
  selector: 'mina-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-row align-center border-bottom' },
})
export class ToolbarComponent extends ManualDetection implements OnInit {

  menu: AppMenu;
  title: string;
  definiteLoading: LoadingEvent;
  isMobile: boolean;
  currentTheme: ThemeType;
  readonly appIdentifier: string = CONFIG.identifier;

  @ViewChild('loadingRef') private loadingRef: ElementRef<HTMLDivElement>;

  constructor(private router: Router,
              private store: Store<MinaState>,
              private loadingService: LoadingService,
              private themeService: ThemeSwitcherService) { super(); }

  ngOnInit(): void {
    this.currentTheme = this.themeService.activeTheme;
    this.listenToTitleChange();
    this.listenToMenuChange();
    this.listenToLoading();
  }

  private listenToLoading(): void {
    const displayNone: string = 'd-none';
    const classList = this.loadingRef.nativeElement.classList;

    this.loadingService.countSub$
      .pipe(delay(0))
      .subscribe((count: number) => {
        if (count > 0) {
          classList.remove(displayNone);
        } else {
          classList.add(displayNone);
        }
      });

    this.loadingService.progressLoadingSub$
      .pipe(delay(0))
      .subscribe((event: LoadingEvent) => {
        this.definiteLoading = event;
        if (event.percentage === 100) {
          this.loadingService.progressLoadingSub$.next({ percentage: 0 });
          return;
        } else if (event.percentage === 0) {
          this.definiteLoading = null;
        }
        this.detect();
      });
  }

  private listenToMenuChange(): void {
    this.store.select(selectAppMenu)
      .pipe(filter(menu => menu.isMobile !== this.isMobile))
      .subscribe((menu: AppMenu) => {
        this.menu = menu;
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
          this.detect();
        }
      });
  }

  changeTheme(): void {
    this.themeService.changeTheme();
    this.currentTheme = this.themeService.activeTheme;
  }

  // toggleTooltips(): void {
  //   this.tooltipService.toggleTooltips();
  // }
}
