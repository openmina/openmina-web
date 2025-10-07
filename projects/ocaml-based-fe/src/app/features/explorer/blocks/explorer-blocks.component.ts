import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { selectActiveNode, selectAppNodeStatus } from '@ocfe-app/app.state';
import { filter, skip } from 'rxjs';
import { ExplorerBlocksClose, ExplorerBlocksGetBlocks } from '@ocfe-explorer/blocks/explorer-blocks.actions';
import { NodeStatus } from '@ocfe-shared/types/app/node-status.type';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { selectExplorerBlocksActiveBlock } from '@ocfe-explorer/blocks/explorer-blocks.state';
import { ExplorerBlock } from '@ocfe-shared/types/explorer/blocks/explorer-block.type';

@Component({
    selector: 'mina-explorer-blocks',
    templateUrl: './explorer-blocks.component.html',
    styleUrls: ['./explorer-blocks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column h-100' },
    standalone: false
})
export class ExplorerBlocksComponent extends StoreDispatcher implements OnInit, OnDestroy {

  isActiveRow: boolean;

  private blockLevel: number;

  constructor(public el: ElementRef) { super() }

  ngOnInit(): void {
    this.listenToActiveNodeAndBlockChange();
    this.listenToActiveRowChange();
  }

  private listenToActiveNodeAndBlockChange(): void {
    const getBlocks = () => this.dispatch(ExplorerBlocksGetBlocks);
    this.select(selectActiveNode, () => {
      getBlocks();
    }, filter(Boolean), skip(1));

    this.select(selectAppNodeStatus, (status: NodeStatus) => {
      this.blockLevel = status.blockLevel;
      getBlocks();
    }, filter(Boolean), filter((status: NodeStatus) => status.blockLevel !== this.blockLevel));
  }

  private listenToActiveRowChange(): void {
    this.select(selectExplorerBlocksActiveBlock, (row: ExplorerBlock) => {
      if (row && !this.isActiveRow) {
        this.isActiveRow = true;
        this.detect();
      } else if (!row && this.isActiveRow) {
        this.isActiveRow = false;
        this.detect();
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(ExplorerBlocksClose);
  }
}
