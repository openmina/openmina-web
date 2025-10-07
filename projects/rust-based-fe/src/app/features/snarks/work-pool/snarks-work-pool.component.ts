import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { SnarksWorkPoolClose, SnarksWorkPoolGetWorkPool, SnarksWorkPoolInit } from '@rufe-snarks/work-pool/snarks-work-pool.actions';
import { selectSnarksWorkPoolOpenSidePanel } from '@rufe-snarks/work-pool/snarks-work-pool.state';
import { selectActiveNode } from '@rufe-app/app.state';

@Component({
    selector: 'mina-snarks-work-pool',
    templateUrl: './snarks-work-pool.component.html',
    styleUrls: ['./snarks-work-pool.component.scss'],
    host: { class: 'flex-column h-100' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SnarksWorkPoolComponent extends StoreDispatcher implements OnInit, OnDestroy {

  openSidePanel: boolean;

  constructor(public el: ElementRef) { super(); }

  ngOnInit(): void {
    this.select(selectActiveNode, node => {
      this.dispatch(SnarksWorkPoolInit);
      this.dispatch(SnarksWorkPoolGetWorkPool);
    });
    this.listenToSidePanelChange();
  }

  private listenToSidePanelChange(): void {
    this.select(selectSnarksWorkPoolOpenSidePanel, open => {
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
    this.dispatch(SnarksWorkPoolClose);
  }
}
