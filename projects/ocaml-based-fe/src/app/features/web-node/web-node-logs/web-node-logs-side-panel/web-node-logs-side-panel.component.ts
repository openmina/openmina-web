import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { WebNodeLog } from '@ocfe-shared/types/web-node/logs/web-node-log.type';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { selectWebNodeLogsActiveLog } from '@ocfe-web-node/web-node-logs/web-node-logs.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WEB_NODE_LOGS_SELECT_LOG, WebNodeLogsSelectLog } from '@ocfe-web-node/web-node-logs/web-node-logs.actions';
import { downloadJson, ExpandTracking, ManualDetection, MinaJsonViewerComponent } from '@openmina/shared';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'mina-web-node-logs-side-panel',
    templateUrl: './web-node-logs-side-panel.component.html',
    styleUrls: ['./web-node-logs-side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column border-left' },
    standalone: false
})
export class WebNodeLogsSidePanelComponent extends ManualDetection implements OnInit {

  activeLog: WebNodeLog;
  jsonString: string;
  expandTracking: ExpandTracking = {};

  @ViewChild(MinaJsonViewerComponent) private minaJsonViewer: MinaJsonViewerComponent;

  constructor(private store: Store<MinaState>,
              private router: Router) { super(); }

  ngOnInit(): void {
    this.listenToWebNodeLogsChanges();
  }

  private listenToWebNodeLogsChanges(): void {
    this.store.select(selectWebNodeLogsActiveLog)
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
      )
      .subscribe((log: WebNodeLog) => {
        this.activeLog = log;
        this.jsonString = JSON.stringify(log.data);
        this.detect();
      });
  }

  closeSidePanel(): void {
    this.router.navigate([Routes.WEB_NODE, Routes.LOGS], { queryParamsHandling: 'merge' });
    this.store.dispatch<WebNodeLogsSelectLog>({ type: WEB_NODE_LOGS_SELECT_LOG, payload: undefined });
  }

  downloadJson(): void {
    downloadJson(this.jsonString, 'web-node-log.json');
  }

  expandEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(true);
  }

  collapseEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(false);
  }
}
