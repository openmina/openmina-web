import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-snarks',
    templateUrl: './snarks.component.html',
    styleUrls: ['./snarks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SnarksComponent {

}
