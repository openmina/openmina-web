import { Directive, OnInit } from '@angular/core';
import { selectAppMenu } from '@rufe-app/app.state';
import { AppMenu } from '@rufe-shared/types/app/app-menu.type';
import { MinaTableWrapper } from '@openmina/shared';
import { MinaState } from '@rufe-app/app.setup';

@Directive()
export abstract class MinaTableRustWrapper<T extends object> extends MinaTableWrapper<T, MinaState> implements OnInit {

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.select(selectAppMenu, (menu: AppMenu) => {
      this.checkViewport(menu.isMobile);
    });
  }
}
