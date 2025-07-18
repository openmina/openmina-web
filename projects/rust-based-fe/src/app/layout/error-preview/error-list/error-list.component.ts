import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MinaErrorType } from '@rufe-shared/types/error-preview/mina-error-type.enum';
import { MinaError } from '@rufe-shared/types/error-preview/mina-error.type';
import { ManualDetection } from '@openmina/shared';

@Component({
    selector: 'mina-error-list',
    templateUrl: './error-list.component.html',
    styleUrls: ['./error-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'border-rad-6 border overflow-y-auto' },
    standalone: false
})
export class ErrorListComponent extends ManualDetection {

  readonly errorIconMap = {
    [MinaErrorType.RUST]: 'terminal',
    [MinaErrorType.GENERIC]: 'error',
  };

  @Input() errors: MinaError[];
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { super(); }

  close(): void {
    this.onConfirm.emit();
  }
}
