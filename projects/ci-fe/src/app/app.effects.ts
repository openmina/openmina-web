import { Injectable } from '@angular/core';
import { MinaState, selectMinaState } from '@cife-app/app.setup';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppActions } from '@cife-app/app.actions';
import { createNonDispatchableEffect, Effect } from '@openmina/shared';
import { MinaCIBaseEffect } from '@cife-shared/base-classes/mina-ci-base.effect';

const INIT_EFFECTS = '@ngrx/effects/init';

@Injectable({
  providedIn: 'root',
})
export class AppEffects extends MinaCIBaseEffect<AppActions> {

  readonly initEffects$: Effect;

  constructor(private actions$: Actions,
              store: Store<MinaState>) {
    super(store, selectMinaState);

    this.initEffects$ = createNonDispatchableEffect(() => this.actions$.pipe(
      ofType(INIT_EFFECTS),
    ));

    store.dispatch({ type: INIT_EFFECTS });
  }
}
