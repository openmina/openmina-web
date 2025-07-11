import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { APP_CHANGE_SUB_MENUS, AppChangeSubMenus } from '@ocfe-app/app.actions';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { CONFIG } from '@ocfe-shared/constants/config';

@Component({
    selector: 'mina-network',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NetworkComponent implements OnInit {

  constructor(private store: Store<MinaState>) { }

  ngOnInit(): void {
    this.store.dispatch<AppChangeSubMenus>({
      type: APP_CHANGE_SUB_MENUS,
      payload: [Routes.MESSAGES, Routes.CONNECTIONS, Routes.BLOCKS, Routes.BLOCKS_IPC, ...(CONFIG.production ? [] : [Routes.PROPAGATION])],
    });
  }
}
