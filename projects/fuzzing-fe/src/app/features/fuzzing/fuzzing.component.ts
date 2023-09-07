import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FuzzingClose, FuzzingGetDirectories, FuzzingGetFiles } from '@fufe-fuzzing/fuzzing.actions';
import { selectFuzzingActiveDirectory, selectFuzzingActiveFile } from '@fufe-fuzzing/fuzzing.state';
import { take, timer } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { StoreDispatcher } from '@fufe-shared/base-classes/store-dispatcher.class';
import { removeParamsFromURL } from '@openmina/shared';
import { AppChangeSubMenus } from '@fufe-app/app.actions';
import { Routes } from '@fufe-shared/enums/routes.enum';
import { getMergedRoute } from '@fufe-shared/router/router-state.selectors';
import { MergedRoute } from '@fufe-shared/router/merged-route';
import { FuzzingFile } from '@fufe-shared/types/fuzzing/fuzzing-file.type';

@Component({
  selector: 'mina-fuzzing',
  templateUrl: './fuzzing.component.html',
  styleUrls: ['./fuzzing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column w-100 h-100' },
})
export class FuzzingComponent extends StoreDispatcher implements OnInit {

  isActiveRow: boolean;

  private activeDirectory: string;

  ngOnInit(): void {
    this.dispatch(AppChangeSubMenus, [Routes.OCAML, Routes.RUST]);
    this.listenToRouteChange();
    this.listenToActiveRowChange();
    this.listenToActiveDirectory();
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      const urlType = removeParamsFromURL(route.url).split('/')[2] as 'ocaml' | 'rust';
      timer(0, 5000)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.dispatch(FuzzingGetDirectories, { urlType });
          if (this.activeDirectory) {
            this.dispatch(FuzzingGetFiles);
          }
        });
    }, take(1));
  }

  private listenToActiveDirectory(): void {
    this.select(selectFuzzingActiveDirectory, (directory: string) => {
      this.activeDirectory = directory;
    });
  }

  private listenToActiveRowChange(): void {
    this.select(selectFuzzingActiveFile, (row: FuzzingFile) => {
      if (row && !this.isActiveRow) {
        this.isActiveRow = true;
        this.detect();
      } else if (!row && this.isActiveRow) {
        this.isActiveRow = false;
        this.detect();
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(FuzzingClose);
  }
}
