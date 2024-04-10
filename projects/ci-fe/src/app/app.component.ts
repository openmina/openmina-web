import { Component } from '@angular/core';
import { MinaState } from '@cife-app/app.setup';
import { Store } from '@ngrx/store';
import { any } from '@openmina/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'overflow-hidden flex-column h-100' },
})
export class AppComponent {

  constructor(private store: Store<MinaState>) {
    if (any(window).Cypress) {
      any(window).store = store;
    }
  }
}
