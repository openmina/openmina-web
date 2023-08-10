import { Directive, OnInit } from '@angular/core';
import { selectAppMenu } from '@ocfe-app/app.state';
import { AppMenu } from '@ocfe-shared/types/app/app-menu.type';
import { MinaTableWrapper } from '@openmina/shared';
import { MinaState } from '@ocfe-app/app.setup';

@Directive()
export abstract class MinaTableOcamlWrapper<T extends object> extends MinaTableWrapper<T, MinaState> implements OnInit {

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.select(selectAppMenu, (menu: AppMenu) => {
      this.checkViewport(menu.isMobile);
    });
  }
}
