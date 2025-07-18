import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { SecDurationConfig, TableColumnList } from '@openmina/shared';
import { Router } from '@angular/router';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { NetworkBlocksIpcSort } from '@ocfe-network/blocks-ipc/network-blocks-ipc.actions';
import {
  selectNetworkBlocksIpc,
  selectNetworkBlocksIpcSorting
} from '@ocfe-network/blocks-ipc/network-blocks-ipc.state';
import { NetworkBlockIpc } from '@ocfe-shared/types/network/blocks-ipc/network-block-ipc.type';
import { MinaTableOcamlWrapper } from '@ocfe-shared/base-classes/mina-table-ocaml-wrapper.class';

@Component({
    selector: 'mina-network-blocks-ipc-table',
    templateUrl: './network-blocks-ipc-table.component.html',
    styleUrls: ['./network-blocks-ipc-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column' },
    standalone: false
})
export class NetworkBlocksIpcTableComponent extends MinaTableOcamlWrapper<NetworkBlockIpc> implements OnInit {

  readonly secConfig: SecDurationConfig = {
    color: true,
    default: 0.5,
    warn: 0.75,
    severe: 1,
    undefinedAlternative: '-'
  };

  protected readonly tableHeads: TableColumnList<NetworkBlockIpc> = [
    { name: 'datetime', sort: 'timestamp' },
    { name: 'message hash', sort: 'hash' },
    { name: 'height' },
    { name: 'node address', sort: 'nodeAddress' },
    { name: 'peer address', sort: 'peerAddress' },
    { name: 'type' },
    { name: 'message type', sort: 'msgType' },
    { name: 'block latency', sort: 'blockLatency' },
  ];

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToNetworkBlocks();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [165, 130, 80, 130, 160, 130, 140, 160, 40];
    this.table.sortClz = NetworkBlocksIpcSort;
    this.table.sortSelector = selectNetworkBlocksIpcSorting;
  }

  private listenToNetworkBlocks(): void {
    this.store.select(selectNetworkBlocksIpc)
      .pipe(untilDestroyed(this))
      .subscribe((blocks: NetworkBlockIpc[]) => {
        this.table.rows = blocks;
        this.table.detect();
      });
  }

  seeMessagesForAddress(addr: string): void {
    this.router.navigate([Routes.NETWORK, Routes.MESSAGES], {
      queryParams: { addr },
      queryParamsHandling: 'merge',
    });
  }
}
