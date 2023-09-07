import { Injectable } from '@angular/core';
import { MinaState, selectMinaState } from '@fufe-app/app.setup';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FuzzingMinaBaseEffect } from '@fufe-shared/base-classes/fuzzing-mina-base.effect';
import { map } from 'rxjs';
import { APP_INIT, AppActions } from '@fufe-app/app.actions';
import { Effect } from '@openmina/shared';

const INIT_EFFECTS = '@ngrx/effects/init';

@Injectable({
  providedIn: 'root',
})
export class AppEffects extends FuzzingMinaBaseEffect<AppActions> {

  readonly initEffects$: Effect;

  constructor(private actions$: Actions,
              store: Store<MinaState>) {

    super(store, selectMinaState);

    this.initEffects$ = createEffect(() => this.actions$.pipe(
      ofType(INIT_EFFECTS),
      map(() => ({ type: APP_INIT })),
    ));

  }

}
