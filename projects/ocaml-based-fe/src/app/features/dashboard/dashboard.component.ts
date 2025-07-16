import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { APP_CHANGE_SUB_MENUS, AppChangeSubMenus } from '@ocfe-app/app.actions';
import { Routes } from '@ocfe-shared/enums/routes.enum';

@Component({
    selector: 'mina-overview',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<MinaState>) { }

  ngOnInit(): void {
    this.store.dispatch<AppChangeSubMenus>({
      type: APP_CHANGE_SUB_MENUS,
      payload: [/*Routes.BLOCK, Routes.LIBP2P, */Routes.NODES, Routes.TOPOLOGY],
    });
  }

}
