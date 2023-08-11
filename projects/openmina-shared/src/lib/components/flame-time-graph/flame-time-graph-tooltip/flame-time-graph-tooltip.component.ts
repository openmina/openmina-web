import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OpenminaSharedModule } from '../../../openmina-shared.module';
import { ManualDetection } from '../../../base-classes/manual-detection.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mina-flame-time-graph-tooltip',
  standalone: true,
  imports: [OpenminaSharedModule, CommonModule],
  templateUrl: './flame-time-graph-tooltip.component.html',
  styleUrls: ['./flame-time-graph-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush ,
  host: { class: 'bg-surface-top pt-5 f-10 flex-column border-rad-6' },
})
export class FlameTimeGraphTooltipComponent extends ManualDetection {

  @Input() xSteps: string[];
  @Input() activeXPointIndex: number;
  @Input() range: string;
  @Input() mean: number;
  @Input() max: number;
  @Input() calls: number;
  @Input() totalTime: number;

}
