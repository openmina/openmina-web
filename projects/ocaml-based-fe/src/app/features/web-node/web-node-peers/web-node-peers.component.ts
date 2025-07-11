import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { WebNodePeersClose } from '@ocfe-web-node/web-node-peers/web-node-peers.actions';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { WebNodeSharedGetPeers } from '@ocfe-web-node/web-node.actions';

@Component({
    selector: 'mina-web-node-peers',
    templateUrl: './web-node-peers.component.html',
    styleUrls: ['./web-node-peers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column' },
    standalone: false
})
export class WebNodePeersComponent extends StoreDispatcher implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.dispatch(WebNodeSharedGetPeers);
  }

  override ngOnDestroy(): void {
    this.dispatch(WebNodePeersClose);
  }
}
