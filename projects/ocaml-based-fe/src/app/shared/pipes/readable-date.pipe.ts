import { Pipe, PipeTransform } from '@angular/core';
import { ONE_MILLION, toReadableDate } from '@openmina/shared';

@Pipe({
  name: 'readableDate',
})
export class ReadableDatePipe implements PipeTransform {
  transform(value: number, format?: string): string {
    if (value > 1e13) {
      value = value / ONE_MILLION;
    }

    return value ? toReadableDate(value, format) : '-';
  }
}
