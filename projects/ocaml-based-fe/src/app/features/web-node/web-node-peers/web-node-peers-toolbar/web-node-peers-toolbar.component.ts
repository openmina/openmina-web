import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebNodePeersSelectPeer } from '@ocfe-web-node/web-node-peers/web-node-peers.actions';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
    selector: 'mina-web-node-peers-toolbar',
    templateUrl: './web-node-peers-toolbar.component.html',
    styleUrls: ['./web-node-peers-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-lg flex-row' },
    standalone: false
})
export class WebNodePeersToolbarComponent extends StoreDispatcher {

  closeSidePanel(): void {
    this.dispatch(WebNodePeersSelectPeer, undefined);
  }
}
