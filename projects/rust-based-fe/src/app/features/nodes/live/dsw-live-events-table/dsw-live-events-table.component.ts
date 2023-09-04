import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SEC_CONFIG_GRAY_PALETTE, SecDurationConfig, TableColumnList } from '@openmina/shared';
import { filter } from 'rxjs';
import { DswLiveBlockEvent } from '@rufe-shared/types/nodes/live/dsw-live-block-event.type';
import { DswLiveSortEvents } from '@rufe-app/features/nodes/live/dsw-live.actions';
import { selectDswLiveFilteredEvents, selectDswLiveSort } from '@rufe-app/features/nodes/live/dsw-live.state';
import { MinaTableRustWrapper } from '@rufe-shared/base-classes/mina-table-rust-wrapper.class';

@Component({
  selector: 'mina-dsw-live-events-table',
  templateUrl: './dsw-live-events-table.component.html',
  styleUrls: ['./dsw-live-events-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-minus-lg flex-column' },
})
export class DswLiveEventsTableComponent extends MinaTableRustWrapper<DswLiveBlockEvent> implements OnInit {

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
