import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class StateComponent {

}
