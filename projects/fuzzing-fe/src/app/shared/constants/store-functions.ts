import { Observable, of } from 'rxjs';
import { ADD_ERROR, ErrorAdd } from '@fufe-error-preview/error-preview.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { MinaErrorType } from '@fufe-shared/types/error-preview/mina-error-type.enum';
import { toReadableDate } from '@openmina/shared';


export const addError = (error: HttpErrorResponse | Error, type: MinaErrorType): ErrorAdd => {
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
