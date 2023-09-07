import { Injectable } from '@angular/core';
import { FuzzingMinaBaseEffect } from '@fufe-shared/base-classes/fuzzing-mina-base.effect';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MinaState, selectMinaState } from '@fufe-app/app.setup';
import { catchError, filter, map, repeat, switchMap } from 'rxjs';
import {
  FUZZING_GET_DIRECTORIES,
  FUZZING_GET_DIRECTORIES_SUCCESS,
  FUZZING_GET_FILE_DETAILS,
  FUZZING_GET_FILE_DETAILS_SUCCESS,
  FUZZING_GET_FILES,
  FUZZING_GET_FILES_SUCCESS,
  FUZZING_SET_ACTIVE_DIRECTORY,
  FuzzingActions,
  FuzzingGetFileDetails,
  FuzzingGetFiles,
  FuzzingSetActiveDirectory,
} from '@fufe-fuzzing/fuzzing.actions';
import { FuzzingService } from '@fufe-fuzzing/fuzzing.service';
import { Effect } from '@openmina/shared';
import { FuzzingDirectory } from '@fufe-shared/types/fuzzing/fuzzing-directory.type';
import { addError } from '@fufe-shared/constants/store-functions';
import { MinaErrorType } from '@fufe-shared/types/error-preview/mina-error-type.enum';
import { FuzzingFile } from '@fufe-shared/types/fuzzing/fuzzing-file.type';
import { FuzzingFileDetails } from '@fufe-shared/types/fuzzing/fuzzing-file-details.type';

@Injectable({
  providedIn: 'root',
})
export class FuzzingEffects extends FuzzingMinaBaseEffect<FuzzingActions> {

  readonly getDirectories$: Effect;
  readonly getFiles$: Effect;
  readonly getFileDetails$: Effect;

  constructor(private actions$: Actions,
              private fuzzingService: FuzzingService,
              store: Store<MinaState>) {

    super(store, selectMinaState);

    this.getDirectories$ = createEffect(() => this.actions$.pipe(
      ofType(FUZZING_GET_DIRECTORIES),
      switchMap(() => this.fuzzingService.getRootDirectoryContent()),
      map((payload: FuzzingDirectory[]) => ({ type: FUZZING_GET_DIRECTORIES_SUCCESS, payload })),
      catchError((error: Error) => [
        addError(error, MinaErrorType.GENERIC),
        { type: FUZZING_GET_DIRECTORIES_SUCCESS, payload: [] },
      ]),
      repeat(),
    ));

    this.getFiles$ = createEffect(() => this.actions$.pipe(
      ofType(FUZZING_GET_FILES, FUZZING_SET_ACTIVE_DIRECTORY),
      this.latestActionState<FuzzingGetFiles | FuzzingSetActiveDirectory>(),
      switchMap(({ state }) => this.fuzzingService.getFiles(state.fuzzing.activeDirectory.fullName, state.fuzzing.urlType)),
      map((payload: FuzzingFile[]) => ({ type: FUZZING_GET_FILES_SUCCESS, payload })),
      catchError((error: Error) => [
        addError(error, MinaErrorType.GENERIC),
        { type: FUZZING_GET_FILES_SUCCESS, payload: [] },
      ]),
      repeat(),
    ));

    this.getFileDetails$ = createEffect(() => this.actions$.pipe(
      ofType(FUZZING_GET_FILE_DETAILS),
      this.latestActionState<FuzzingGetFileDetails>(),
      filter(({ action }) => !!action.payload),
      switchMap(({ action, state }) => this.fuzzingService.getFileDetails(state.fuzzing.activeDirectory.fullName, action.payload.name)),
      map((payload: FuzzingFileDetails) => ({ type: FUZZING_GET_FILE_DETAILS_SUCCESS, payload })),
      catchError((error: Error) => [
        addError(error, MinaErrorType.GENERIC),
        { type: FUZZING_GET_FILE_DETAILS_SUCCESS, payload: { lines: [], executedLines: 0, filename: '' } as FuzzingFileDetails },
      ]),
      repeat(),
    ));
  }
}
