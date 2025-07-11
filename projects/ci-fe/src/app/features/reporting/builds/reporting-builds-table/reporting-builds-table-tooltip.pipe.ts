import { Pipe, PipeTransform } from '@angular/core';
import { hasValue } from '@openmina/shared';

@Pipe({
    name: 'reportingTooltip',
    standalone: false
})
export class ReportingBuildsTableTooltipPipe implements PipeTransform {

  transform(curr: number, prev: number): string {
    if (!hasValue(prev)) {
      return null;
    }

    const diff = Math.abs(curr - prev).toFixed(1);
    const faster = curr > prev;
    return '<span class=\'' + (faster ? 'warn' : 'success') + '-primary\'>' + diff + 's</span>' + (faster ? ' slower' : ' faster') + ' than previous run';
  }
}
