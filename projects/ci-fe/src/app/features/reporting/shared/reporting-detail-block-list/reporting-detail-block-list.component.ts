import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportDetailBlock } from '@cife-shared/types/reporting/report-detail-block.type';
import { SecDurationConfig, SortDirection, TableColumnList, TableSort } from '@openmina/shared';

@Component({
    selector: 'mina-reporting-detail-block-list',
    templateUrl: './reporting-detail-block-list.component.html',
    styleUrls: ['./reporting-detail-block-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-minus-lg flex-column' },
    standalone: false
})
export class ReportingDetailBlockListComponent {

  @Input() blocks: ReportDetailBlock[] = [];
  @Input() currentSort: TableSort<ReportDetailBlock>;

  @Output() closeStep2: EventEmitter<void> = new EventEmitter<void>();
  @Output() sortBlocks: EventEmitter<TableSort<ReportDetailBlock>> = new EventEmitter<TableSort<ReportDetailBlock>>();
  @Output() changeBlock: EventEmitter<ReportDetailBlock> = new EventEmitter<ReportDetailBlock>();

  readonly itemSize: number = 36;
  readonly secConfig: SecDurationConfig = {
    color: true,
    default: 0.5,
    warn: 0.75,
    severe: 1,
    undefinedAlternative: '-'
  };
  readonly tableHeads: TableColumnList<ReportDetailBlock> = [
    { name: 'height' },
    { name: 'gl. slot', sort: 'globalSlot' },
    { name: 'hash', sort: 'blockHash' },
    { name: 'tx', sort: 'transactions' },
    { name: 'max lat.', sort: 'maxReceiveLatency' },
    { name: 'prod nodes', sort: 'blockProducerNodesLength' },
  ];

  onRowClick(block: ReportDetailBlock): void {
    this.closeStep2.emit();
    this.changeBlock.emit(block);
  }

  sortTable(sortBy: string): void {
    const sortDirection = sortBy !== this.currentSort.sortBy
      ? this.currentSort.sortDirection
      : this.currentSort.sortDirection === SortDirection.ASC ? SortDirection.DSC : SortDirection.ASC;
    this.sortBlocks.emit({ sortBy: sortBy as keyof ReportDetailBlock, sortDirection });
  }
}
