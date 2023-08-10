import { Pipe, PipeTransform } from '@angular/core';
import { ONE_MILLION, ONE_THOUSAND } from '@openmina/shared';

@Pipe({
  name: 'thousand',
})
export class ThousandPipe implements PipeTransform {

  transform(value: number): string | number {
    if (value >= ONE_MILLION) {
      return (value / ONE_MILLION).toFixed(0) + 'm';
    } else if (value >= ONE_THOUSAND) {
      return (value / ONE_THOUSAND).toFixed(0) + 'k';
    }
    return value;
  }

}
