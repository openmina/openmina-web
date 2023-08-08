import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MinaTableWrapper } from '@ocfe-shared/base-classes/mina-table-wrapper.class';
import { SEC_CONFIG_GRAY_PALETTE, SecDurationConfig } from '@ocfe-shared/pipes/sec-duration.pipe';
import { TableColumnList } from '@ocfe-shared/types/shared/table-head-sorting.type';
import { filter } from 'rxjs';
import { DswLiveBlockEvent } from '@ocfe-shared/types/dsw/live/dsw-live-block-event.type';
import { DswLiveSortEvents } from '@ocfe-dsw/live/dsw-live.actions';
import { selectDswLiveFilteredEvents, selectDswLiveSort } from '@ocfe-dsw/live/dsw-live.state';

@Component({
  selector: 'mina-dsw-live-events-table',
  templateUrl: './dsw-live-events-table.component.html',
  styleUrls: ['./dsw-live-events-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-minus-lg flex-column' },
})
export class DswLiveEventsTableComponent extends MinaTableWrapper<DswLiveBlockEvent> implements OnInit {

  readonly secConfig: SecDurationConfig = {
    color: true,
    onlySeconds: false,
    colors: SEC_CONFIG_GRAY_PALETTE,
    severe: 10,
    warn: 1,
    default: 0.01,
    undefinedAlternative: '-',
  };

  protected readonly tableHeads: TableColumnList<DswLiveBlockEvent> = [
    { name: 'datetime', sort: 'timestamp' },
    { name: 'height' },
    { name: 'message' },
    { name: 'status' },
    { name: 'elapsed' },
  ];

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToNodesChanges();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [165, 80, 160, 100, 80];
    this.table.sortClz = DswLiveSortEvents;
    this.table.sortSelector = selectDswLiveSort;
  }

  private listenToNodesChanges(): void {
    this.select(selectDswLiveFilteredEvents, (events: DswLiveBlockEvent[]) => {
      this.table.rows = events;
      this.table.detect();
    }, filter(Boolean));
  }
}
