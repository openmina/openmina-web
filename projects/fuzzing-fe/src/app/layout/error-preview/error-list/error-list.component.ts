import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ManualDetection } from '@openmina/shared';
import { MinaErrorType } from '@fufe-shared/types/error-preview/mina-error-type.enum';
import { MinaError } from '@fufe-shared/types/error-preview/mina-error.type';

@Component({
  selector: 'mina-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'border-rad-6 border overflow-y-auto' },
})
export class ErrorListComponent extends ManualDetection {

  readonly errorIconMap = {
    [MinaErrorType.GRAPH_QL]: 'dns',
    [MinaErrorType.DEBUGGER]: 'code',
    [MinaErrorType.WEB_NODE]: 'language',
    [MinaErrorType.MINA_EXPLORER]: 'emergency_home',
    [MinaErrorType.GENERIC]: 'error',
  };

  @Input() errors: MinaError[];
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { super(); }

  close(): void {
    this.onConfirm.emit();
  }
}
