import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, Observable, ObservedValueOf, of, OperatorFunction, repeat } from 'rxjs';
import { Selector } from '@ngrx/store/src/models';
import { withLatestFrom } from 'rxjs/operators';
import { ADD_ERROR, ErrorAdd } from '@ocfe-error-preview/error-preview.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { MinaErrorType } from '@ocfe-shared/types/error-preview/mina-error-type.enum';
import { toReadableDate } from '@ocfe-shared/helpers/date.helper';
import * as Sentry from '@sentry/angular-ivy';
import { FeatureAction } from '@ocfe-shared/types/store/feature-action.type';

export const createNonDispatchableEffect = (source: () => any) => createEffect(source, { dispatch: false });

export const selectActionAndState = <S, A>(store: Store<S>, selector: Selector<S, any>): OperatorFunction<A, { action: A; state: S; }> =>
  withLatestFrom(
    store.select<S>(selector),
    (action: A, state: ObservedValueOf<Store<S>>): { action: A, state: S } => ({ action, state }),
  );

export const selectLatestStateSlice = <R extends object, S, A>(store: Store<S>, selector: Selector<S, any>, path: string): OperatorFunction<A, R> =>
  withLatestFrom(
    store.select<S>(selector),
    (action: A, state: ObservedValueOf<Store<S>>): R => path.split('.').reduce((acc: R, key: string) => acc[key as keyof R], state as unknown as R),
  );

export const catchErrorAndRepeat = <T>(errType: MinaErrorType, type: string, payload?: any): OperatorFunction<T, ErrorAdd | T | FeatureAction<any>> => {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((error: Error) => [
        addError(error, errType),
        { type, payload },
      ]),
      repeat(),
    );
};

export const addError = (error: HttpErrorResponse | Error, type: MinaErrorType): ErrorAdd => {
  Sentry.captureException(error, { tags: { type } });
  console.error(error);
  return {
    type: ADD_ERROR,
    payload: {
      type,
      message: error.message,
      status: (error as any).status ? `${(error as any).status} ${(error as any).statusText}` : undefined,
      timestamp: toReadableDate(Number(Date.now()), 'HH:mm:ss'),
      seen: false,
    },
  } as ErrorAdd;
};

export const addErrorObservable = (error: HttpErrorResponse | Error | any, type: MinaErrorType): Observable<ErrorAdd> => of(addError(error, type));
