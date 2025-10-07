import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'mina-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 w-100 flex-row' },
    standalone: false
})
export class DashboardComponent {

}
