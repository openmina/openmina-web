import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';
import { selectActiveLog } from '@ocfe-logs/logs.state';
import { Log } from '@ocfe-shared/types/logs/log.type';
import { ExpandTracking } from '@ocfe-shared/components/mina-json-viewer/mina-json-viewer.component';
import { LogsSetActiveLog } from '@ocfe-logs/logs.actions';

@Component({
  selector: 'mina-logs-side-panel',
  templateUrl: './logs-side-panel.component.html',
  styleUrls: ['./logs-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsSidePanelComponent extends StoreDispatcher implements OnInit {

  activeLog: Log;
  expandTracking: ExpandTracking = {};

  ngOnInit(): void {
    this.select(selectActiveLog, (log: Log) => {
      this.activeLog = log;
      this.detect();
    });
  }

  closeSidePanel(): void {
    this.dispatch(LogsSetActiveLog, undefined);
  }
}
