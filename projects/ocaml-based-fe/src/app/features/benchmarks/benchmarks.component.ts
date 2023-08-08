import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { APP_CHANGE_SUB_MENUS, AppChangeSubMenus } from '@ocfe-app/app.actions';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { ManualDetection } from '@ocfe-shared/base-classes/manual-detection.class';

@Component({
  selector: 'mina-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column h-100' },
})
export class BenchmarksComponent extends ManualDetection implements OnInit {

  constructor(private store: Store<MinaState>) { super(); }

  ngOnInit(): void {
    this.store.dispatch<AppChangeSubMenus>({ type: APP_CHANGE_SUB_MENUS, payload: [Routes.WALLETS/*, Routes.TRANSACTIONS*/] });
  }
}
