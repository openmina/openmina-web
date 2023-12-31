import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { DswWorkPoolClose, DswWorkPoolGetWorkPool, DswWorkPoolInit } from '@rufe-snarks/work-pool/dsw-work-pool.actions';
import { selectDswWorkPoolOpenSidePanel } from '@rufe-snarks/work-pool/dsw-work-pool.state';
import { selectActiveNode } from '@rufe-app/app.state';

@Component({
  selector: 'mina-dsw-work-pool',
  templateUrl: './dsw-work-pool.component.html',
  styleUrls: ['./dsw-work-pool.component.scss'],
  host: { class: 'flex-column h-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswWorkPoolComponent extends StoreDispatcher implements OnInit, OnDestroy {

  openSidePanel: boolean;

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    this.select(selectActiveNode, node => {
      this.dispatch(DswWorkPoolInit);
      this.dispatch(DswWorkPoolGetWorkPool);
    });
    this.listenToSidePanelChange();
  }

  private listenToSidePanelChange(): void {
    this.select(selectDswWorkPoolOpenSidePanel, open => {
      if (open && !this.openSidePanel) {
        this.openSidePanel = true;
        this.detect();
      } else if (!open && this.openSidePanel) {
        this.openSidePanel = false;
        this.detect();
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatch(DswWorkPoolClose);
  }
}
