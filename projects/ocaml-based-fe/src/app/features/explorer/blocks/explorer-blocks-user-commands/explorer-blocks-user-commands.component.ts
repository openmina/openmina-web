import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ExplorerBlockTx } from '@ocfe-shared/types/explorer/blocks/explorer-block-tx.type';
import { toggleItem } from '@openmina/shared';

@Component({
    selector: 'mina-explorer-blocks-user-commands',
    templateUrl: './explorer-blocks-user-commands.component.html',
    styleUrls: ['./explorer-blocks-user-commands.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExplorerBlocksUserCommandsComponent implements OnChanges {

  @Input() txs: ExplorerBlockTx[] = [];
  opened: ExplorerBlockTx[] = [];

  constructor() { }

  ngOnChanges(): void {
  }

  toggleOpening(tx: ExplorerBlockTx): void {
    this.opened = toggleItem(this.opened, tx);
  }
}
