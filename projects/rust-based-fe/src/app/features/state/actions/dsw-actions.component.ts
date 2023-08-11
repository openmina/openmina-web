import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { DswActionsClose, DswActionsGetEarliestSlot } from '@rufe-state/actions/dsw-actions.actions';
import { selectDswActionsOpenSidePanel } from '@rufe-state/actions/dsw-actions.state';
import { Subscription, timer } from 'rxjs';
import { selectActiveNode } from '@rufe-app/app.state';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'mina-dsw-actions',
  templateUrl: './dsw-actions.component.html',
  styleUrls: ['./dsw-actions.component.scss'],
  host: { class: 'flex-column h-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswActionsComponent extends StoreDispatcher implements OnInit, OnDestroy {

  show: boolean;

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    this.checkEarliestSlot();
    this.listenToSidePanelChange();
  }

  private listenToSidePanelChange(): void {
    this.select(selectDswActionsOpenSidePanel, (open: boolean) => {
      this.show = open;
      this.detect();
    });
  }

  private checkEarliestSlot(): void {
    let subscription: Subscription;

    this.select(selectActiveNode, () => {
      subscription?.unsubscribe();
      subscription = timer(0, 20000)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.dispatch(DswActionsGetEarliestSlot);
        });
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(DswActionsClose);
  }
}
