import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NetworkMessagesTableComponent
} from '@ocfe-network/messages/network-messages-table/network-messages-table.component';
import { selectNetworkActiveRow } from '@ocfe-network/messages/network-messages.state';
import { NetworkMessage } from '@ocfe-shared/types/network/messages/network-message.type';
import { NetworkMessagesClose, NetworkMessagesInit } from '@ocfe-network/messages/network-messages.actions';
import { AppUpdateDebuggerStatus } from '@ocfe-app/app.actions';
import { selectActiveNode } from '@ocfe-app/app.state';
import { filter } from 'rxjs';
import { StoreDispatcher } from '@ocfe-shared/base-classes/store-dispatcher.class';

@Component({
    selector: 'mina-network-messages',
    templateUrl: './network-messages.component.html',
    styleUrls: ['./network-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'h-100' },
    standalone: false
})
export class NetworkMessagesComponent extends StoreDispatcher implements OnInit, OnDestroy {

  isActiveRow: boolean;

  @ViewChild(NetworkMessagesTableComponent) private tableComponent: NetworkMessagesTableComponent;

  ngOnInit(): void {
    this.listenToActiveRowChange();
    this.listenToActiveNodeChange();
  }

  private listenToActiveNodeChange(): void {
    this.select(selectActiveNode, () => {
      this.dispatch(NetworkMessagesInit);
    }, filter(Boolean));
  }

  private listenToActiveRowChange(): void {
    this.select(selectNetworkActiveRow, (row: NetworkMessage) => {
      if (row && !this.isActiveRow) {
        this.isActiveRow = true;
        this.detect();
      } else if (!row && this.isActiveRow) {
        this.isActiveRow = false;
        this.detect();
      }
    });
  }

  checkVirtualScrollViewport(): void {
    this.tableComponent.table.virtualScroll.checkViewportSize();
  }

  scrollToTop(): void {
    this.tableComponent.table.virtualScroll.scrollToIndex(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(AppUpdateDebuggerStatus, { failed: undefined });
    this.dispatch(NetworkMessagesClose);
  }
}
