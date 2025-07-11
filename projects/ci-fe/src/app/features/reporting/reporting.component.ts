import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'mina-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ReportingComponent {
}
