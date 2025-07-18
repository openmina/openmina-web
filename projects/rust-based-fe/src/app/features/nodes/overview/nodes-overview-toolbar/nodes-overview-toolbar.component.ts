import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';

@Component({
    selector: 'mina-nodes-overview-toolbar',
    templateUrl: './nodes-overview-toolbar.component.html',
    styleUrls: ['./nodes-overview-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-row h-xl' },
    standalone: false
})
export class NodesOverviewToolbarComponent extends StoreDispatcher implements OnInit {

  ngOnInit(): void {
  }

}
