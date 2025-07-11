import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppChangeSubMenus } from '@ocfe-app/app.actions';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { isVanilla } from '@ocfe-shared/constants/config';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
    selector: 'mina-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExplorerComponent extends StoreDispatcher implements OnInit {

  ngOnInit(): void {
    this.dispatch(AppChangeSubMenus, [
      Routes.BLOCKS, Routes.TRANSACTIONS, Routes.SNARK_POOL, ...(isVanilla() ? [null] : [Routes.SCAN_STATE, Routes.SNARK_TRACES])
    ]);
  }
}
