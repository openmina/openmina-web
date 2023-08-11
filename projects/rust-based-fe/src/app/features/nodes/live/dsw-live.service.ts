import { Injectable } from '@angular/core';
import { DswDashboardService } from '@rufe-app/features/nodes/dashboard/dsw-dashboard.service';
import { map, Observable } from 'rxjs';
import { DswDashboardNode, DswDashboardNodeKindType } from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-node.type';
import { DswLiveNode } from '@rufe-shared/types/dsw/live/dsw-live-node.type';
import { DswLiveBlockEvent } from '@rufe-shared/types/dsw/live/dsw-live-block-event.type';
import {
  DswDashboardBlock,
  DswDashboardNodeBlockStatus
} from '@rufe-shared/types/dsw/dashboard/dsw-dashboard-block.type';
import { ONE_MILLION, toReadableDate } from '@openmina/shared';
import { RustNodeService } from '@rufe-core/services/rust-node.service';

@Injectable({
  providedIn: 'root',
})
export class DswLiveService {

  constructor(private dswDashboardService: DswDashboardService,
              private rust: RustNodeService) { }

  getLiveNodeTips(): Observable<DswLiveNode[]> {
    return this.dswDashboardService.getNodeTips({ url: this.rust.URL, name: this.rust.name }).pipe(
      map((nodes: DswDashboardNode[]) => nodes
        .filter(n => n.kind !== DswDashboardNodeKindType.OFFLINE)
        .reverse()
        .map((node: DswDashboardNode, index: number) => {
          return ({
            ...node,
            index,
            events: this.getEvents(node),
          } as DswLiveNode);
        })),
    );
  }

  private getEvents(node: DswDashboardNode): DswLiveBlockEvent[] {
    const events: DswLiveBlockEvent[] = [];
    const STARTED = 'Started';
    const COMPLETED = 'Completed';

    node.blocks.forEach((block: DswDashboardBlock, index: number) => {
      if (block.fetchStart) {
        const event = {} as DswLiveBlockEvent;
        event.height = block.height;
        event.message = DswDashboardNodeBlockStatus.FETCHING;
        event.timestamp = block.fetchStart;
        event.datetime = toReadableDate(block.fetchStart / ONE_MILLION);
        event.status = STARTED;
        event.isBestTip = index === 0;
        events.push(event);
      }
      if (block.fetchEnd) {
        const event = {} as DswLiveBlockEvent;
        event.height = block.height;
        event.message = DswDashboardNodeBlockStatus.FETCHED;
        event.timestamp = block.fetchEnd;
        event.datetime = toReadableDate(block.fetchEnd / ONE_MILLION);
        event.elapsed = block.fetchDuration;
        event.status = COMPLETED;
        event.isBestTip = index === 0;
        events.push(event);
      }
      if (block.applyStart) {
        const event = {} as DswLiveBlockEvent;
        event.height = block.height;
        event.message = DswDashboardNodeBlockStatus.APPLYING;
        event.timestamp = block.applyStart;
        event.datetime = toReadableDate(block.applyStart / ONE_MILLION);
        event.status = STARTED;
        event.isBestTip = index === 0;
        events.push(event);
      }
      if (block.applyEnd) {
        const event = {} as DswLiveBlockEvent;
        event.height = block.height;
        event.message = DswDashboardNodeBlockStatus.APPLIED;
        event.timestamp = block.applyEnd;
        event.datetime = toReadableDate(block.applyEnd / ONE_MILLION);
        event.elapsed = block.applyDuration;
        event.status = COMPLETED;
        event.isBestTip = index === 0;
        events.push(event);
      }
    });

    return events;
  }
}
