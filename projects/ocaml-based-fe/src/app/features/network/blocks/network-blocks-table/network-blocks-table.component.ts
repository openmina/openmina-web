import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { selectNetworkBlocks, selectNetworkBlocksSorting } from '@ocfe-network/blocks/network-blocks.state';
import { NetworkBlock } from '@ocfe-shared/types/network/blocks/network-block.type';
import { SecDurationConfig, TableColumnList } from '@openmina/shared';
import { NetworkBlocksSort } from '@ocfe-network/blocks/network-blocks.actions';
import { MinaTableOcamlWrapper } from '@ocfe-shared/base-classes/mina-table-ocaml-wrapper.class';

@Component({
    selector: 'mina-network-blocks-table',
    templateUrl: './network-blocks-table.component.html',
    styleUrls: ['./network-blocks-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column' },
    standalone: false
})
export class NetworkBlocksTableComponent extends MinaTableOcamlWrapper<NetworkBlock> implements OnInit {

  readonly secConfig: SecDurationConfig = {
    onlySeconds: true,
    undefinedAlternative: '-',
    color: true,
    severe: 30,
    warn: 5
  };

  protected readonly tableHeads: TableColumnList<NetworkBlock> = [
    { name: 'ID', sort: 'messageId' },
    { name: 'datetime', sort: 'date' },
    { name: 'message hash', sort: 'hash' },
    { name: 'height' },
    { name: 'from', sort: 'sender' },
    { name: 'to', sort: 'receiver' },
    { name: 'recv. time', sort: 'receivedLatency' },
    { name: 'sent time', sort: 'sentLatency' },
    { name: 'message kind', sort: 'messageKind' },
  ];

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToNetworkBlocks();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [90, 165, 125, 80, 150, 150, 110, 110, 160, 40];
    this.table.sortClz = NetworkBlocksSort;
    this.table.sortSelector = selectNetworkBlocksSorting;
  }

  seeMessageInMessages(messageId: number): void {
    this.router.navigate([Routes.NETWORK, Routes.MESSAGES, messageId], { queryParamsHandling: 'merge' });
  }

  seeMessagesForAddress(addr: string): void {
    this.router.navigate([Routes.NETWORK, Routes.MESSAGES], {
      queryParams: { addr },
      queryParamsHandling: 'merge',
    });
  }

  private listenToNetworkBlocks(): void {
    this.select(selectNetworkBlocks, (blocks: NetworkBlock[]) => {
      this.table.rows = blocks;
      this.table.detect();
    });
  }
}
