import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { selectNetworkConnectionsActiveConnection } from '@ocfe-network/connections/network-connections.state';
import { NetworkConnection } from '@ocfe-shared/types/network/connections/network-connection.type';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { Router } from '@angular/router';
import { NetworkConnectionsSelectConnection } from '@ocfe-network/connections/network-connections.actions';
import { downloadJson, ExpandTracking, MinaJsonViewerComponent } from '@openmina/shared';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
    selector: 'mina-network-connections-side-panel',
    templateUrl: './network-connections-side-panel.component.html',
    styleUrls: ['./network-connections-side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100 flex-column border-left' },
    standalone: false
})
export class NetworkConnectionsSidePanelComponent extends StoreDispatcher implements OnInit {

  connection: NetworkConnection;
  jsonString: string;
  expandingTracking: ExpandTracking = {};

  @ViewChild(MinaJsonViewerComponent) private minaJsonViewer: MinaJsonViewerComponent;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    this.listenToActiveRowChange();
  }

  private listenToActiveRowChange(): void {
    this.select(selectNetworkConnectionsActiveConnection, (connection: NetworkConnection) => {
      this.connection = connection;
      this.jsonString = JSON.stringify(connection);
      this.detect();
    });
  }

  closeSidePanel(): void {
    this.router.navigate([Routes.NETWORK, Routes.CONNECTIONS], { queryParamsHandling: 'merge' });
    this.dispatch(NetworkConnectionsSelectConnection, undefined);
  }

  downloadJson(): void {
    downloadJson(this.jsonString, 'network-connection.json');
  }

  expandEntireJSON(): void {
    this.expandingTracking = this.minaJsonViewer.toggleAll(true);
  }

  collapseEntireJSON(): void {
    this.expandingTracking = this.minaJsonViewer.toggleAll(false);
  }
}
