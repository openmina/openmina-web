import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'mina-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ResourcesComponent {
}
