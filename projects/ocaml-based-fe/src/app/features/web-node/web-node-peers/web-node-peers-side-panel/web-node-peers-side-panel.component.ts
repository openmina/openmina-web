import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { downloadJson, ExpandTracking, ManualDetection, MinaJsonViewerComponent } from '@openmina/shared';
import { WebNodeLog } from '@ocfe-shared/types/web-node/logs/web-node-log.type';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';
import { selectWebNodePeersActivePeer } from '@ocfe-web-node/web-node-peers/web-node-peers.state';
import {
  WEB_NODE_PEERS_SELECT_PEER,
  WebNodePeersSelectPeer
} from '@ocfe-web-node/web-node-peers/web-node-peers.actions';

@UntilDestroy()
@Component({
    selector: 'mina-web-node-peers-side-panel',
    templateUrl: './web-node-peers-side-panel.component.html',
    styleUrls: ['./web-node-peers-side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column border-left' },
    standalone: false
})
export class WebNodePeersSidePanelComponent extends ManualDetection implements OnInit {

  activePeer: WebNodeLog;
  jsonString: string;
  expandTracking: ExpandTracking = {};

  @ViewChild(MinaJsonViewerComponent) private minaJsonViewer: MinaJsonViewerComponent;

  constructor(private store: Store<MinaState>) { super(); }

  ngOnInit(): void {
    this.listenToWebNodePeersChanges();
  }

  private listenToWebNodePeersChanges(): void {
    this.store.select(selectWebNodePeersActivePeer)
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
      )
      .subscribe((log: WebNodeLog) => {
        this.activePeer = log;
        this.jsonString = JSON.stringify(log.data);
        this.detect();
      });
  }

  closeSidePanel(): void {
    this.store.dispatch<WebNodePeersSelectPeer>({ type: WEB_NODE_PEERS_SELECT_PEER, payload: undefined });
  }

  downloadJson(): void {
    downloadJson(this.jsonString, 'web-node-peers.json');
  }

  expandEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(true);
  }

  collapseEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(false);
  }
}
