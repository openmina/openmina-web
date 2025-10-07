import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'mina-dashboard-peers',
    templateUrl: './dashboard-peers.component.html',
    styleUrls: ['./dashboard-peers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column' },
    standalone: false
})
export class DashboardPeersComponent {

}
