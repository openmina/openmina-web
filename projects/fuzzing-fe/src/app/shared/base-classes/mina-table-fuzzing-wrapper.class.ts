import { Directive, OnInit } from '@angular/core';
import { MinaTableWrapper } from '@openmina/shared';
import { MinaState } from '@fufe-app/app.setup';
import { selectAppMenu } from '@fufe-app/app.state';
import { AppMenu } from '@fufe-shared/types/app/app-menu.type';

@Directive()
export abstract class MinaTableFuzzingWrapper<T extends object> extends MinaTableWrapper<T, MinaState> implements OnInit {

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.select(selectAppMenu, (menu: AppMenu) => {
      this.checkViewport(menu.isMobile);
    });
  }
}
