import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, map } from 'rxjs';
import { selectAppMenu } from '@cife-app/app.state';
import { LoadingService } from '@cife-core/services/loading.service';
import { AppMenu } from '@cife-shared/types/app/app-menu.type';
import { ThemeType } from '@cife-shared/types/core/theme/theme-types.type';
import { StoreDispatcher } from '@cife-shared/base-classes/store-dispatcher.class';
import { ThemeSwitcherService } from '@openmina/shared';

@Component({
    selector: 'mina-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-row align-center border-bottom bg-surface' },
    standalone: false
})
export class ToolbarComponent extends StoreDispatcher implements OnInit {

  title: string = 'Reports';
  isMobile: boolean;
  currentTheme: ThemeType;

  @ViewChild('loadingRef') private loadingRef: ElementRef<HTMLDivElement>;

  constructor(private router: Router,
              private loadingService: LoadingService,
              private themeService: ThemeSwitcherService) { super(); }

  ngOnInit(): void {
    this.currentTheme = this.themeService.activeTheme;
    this.listenToTitleChange();
    this.listenToMenuChange();
    this.listenToLoading();
  }

  changeTheme(): void {
    this.themeService.changeTheme();
    this.currentTheme = this.themeService.activeTheme;
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
  }

  private listenToMenuChange(): void {
    this.select(selectAppMenu, (menu: AppMenu) => {
      this.isMobile = menu.isMobile;
      this.detect();
    }, filter(menu => menu.isMobile !== this.isMobile));
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
}
