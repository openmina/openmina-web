import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebNodeLog } from '@ocfe-shared/types/web-node/logs/web-node-log.type';
import { filter } from 'rxjs';
import { selectWebNodePeersActivePeer } from '@ocfe-web-node/web-node-peers/web-node-peers.state';
import { WebNodePeersSelectPeer } from '@ocfe-web-node/web-node-peers/web-node-peers.actions';
import { selectWebNodePeers } from '@ocfe-web-node/web-node.state';
import { TableColumnList } from '@openmina/shared';
import { MinaTableOcamlWrapper } from '@ocfe-shared/base-classes/mina-table-ocaml-wrapper.class';

@Component({
    selector: 'mina-web-node-peers-table',
    templateUrl: './web-node-peers-table.component.html',
    styleUrls: ['./web-node-peers-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column h-100' },
    standalone: false
})
export class WebNodePeersTableComponent extends MinaTableOcamlWrapper<WebNodeLog> implements OnInit {

  protected readonly tableHeads: TableColumnList<WebNodeLog> = [
    { name: 'ID' },
    { name: 'datetime' },
    { name: 'peer ID' },
    { name: 'kind' },
    { name: 'summary' },
    { name: 'level' },
  ];

  activePeer: WebNodeLog;
  isActiveRow: boolean;

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToWebNodePeersChanges();
    this.listenToActivePeer();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [70, 155, 210, 200, 400, 200];
    this.table.propertyForActiveCheck = 'id';
  }

  private listenToWebNodePeersChanges(): void {
    this.select(selectWebNodePeers, (peers: WebNodeLog[]) => {
      this.table.rows = peers || [];
      this.table.detect();
    });
  }

  private listenToActivePeer(): void {
    this.select(selectWebNodePeersActivePeer, (row: WebNodeLog) => {
      this.activePeer = row;
      this.table.activeRow = row;
      this.table.detect();

      if (row && !this.isActiveRow) {
        this.isActiveRow = true;
      } else if (!row && this.isActiveRow) {
        this.isActiveRow = false;
      }
      this.detect();
    }, filter(peer => peer !== this.activePeer));
  }

  protected override onRowClick(peer: WebNodeLog): void {
    if (this.activePeer?.id !== peer.id) {
      this.activePeer = peer;
      this.dispatch(WebNodePeersSelectPeer, peer);
    }
  }
}
