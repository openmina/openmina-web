import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppChangeSubMenus } from '@ocfe-app/app.actions';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
  selector: 'mina-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-100' },
})
export class TracingComponent extends StoreDispatcher implements OnInit {

  ngOnInit(): void {
    this.dispatch(AppChangeSubMenus, [Routes.OVERVIEW, Routes.BLOCKS]);
  }
}
