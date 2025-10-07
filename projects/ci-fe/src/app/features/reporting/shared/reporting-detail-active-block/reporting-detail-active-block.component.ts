import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportDetailBlock } from '@cife-shared/types/reporting/report-detail-block.type';
import { ReportDetailBlockPeerTiming } from '@cife-shared/types/reporting/report-detail-block-peer-timing.type';
import { SecDurationConfig, SortDirection, TableColumnList, TableSort } from '@openmina/shared';

@Component({
    selector: 'mina-reporting-detail-active-block',
    templateUrl: './reporting-detail-active-block.component.html',
    styleUrls: ['./reporting-detail-active-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-column h-100' },
    standalone: false
})
export class ReportingDetailActiveBlockComponent {

  @Input() block: ReportDetailBlock;
  @Input() currentSort: TableSort<ReportDetailBlockPeerTiming>;

  @Output() closeStep3: EventEmitter<void> = new EventEmitter<void>();
  @Output() sort: EventEmitter<TableSort<ReportDetailBlockPeerTiming>> = new EventEmitter<TableSort<ReportDetailBlockPeerTiming>>();

  readonly secConfig: SecDurationConfig = {
    color: true,
    default: 0.5,
    warn: 0.75,
    severe: 1,
    undefinedAlternative: '-'
  };
  readonly tableHeads: TableColumnList<ReportDetailBlockPeerTiming> = [
    { name: 'node', sort: 'nodeSort' },
    { name: 'block processing', sort: 'blockProcessingTime' },
    { name: 'block broadcast', sort: 'receiveLatency' },
  ];

  selectedTabIndex: number = 0;

  sortTable(sortBy: string): void {
    const sortDirection = sortBy !== this.currentSort.sortBy
      ? this.currentSort.sortDirection
      : this.currentSort.sortDirection === SortDirection.ASC ? SortDirection.DSC : SortDirection.ASC;
    this.sort.emit({ sortBy: sortBy as keyof ReportDetailBlockPeerTiming, sortDirection });
  }

  selectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  onClose(): void {
    this.closeStep3.emit();
  }
}
