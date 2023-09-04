import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectDswWorkPoolActiveWorkPool } from '@rufe-snarks/work-pool/dsw-work-pool.state';
import { WorkPool } from '@rufe-shared/types/snarks/work-pool/work-pool.type';
import { DswWorkPoolSetActiveWorkPool, DswWorkPoolToggleSidePanel } from '@rufe-snarks/work-pool/dsw-work-pool.actions';
import { Router } from '@angular/router';
import { Routes } from '@rufe-shared/enums/routes.enum';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'mina-dsw-work-pool-side-panel',
  templateUrl: './dsw-work-pool-side-panel.component.html',
  styleUrls: ['./dsw-work-pool-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column h-100' },
})
export class DswWorkPoolSidePanelComponent extends StoreDispatcher implements OnInit {

  activeWorkPool: WorkPool;
  activeStep: number = 0;

  @ViewChild('navDropdown') private dropdown: TemplateRef<void>;

  private overlayRef: OverlayRef;

  constructor(private router: Router,
              private overlay: Overlay,
              private viewContainerRef: ViewContainerRef) { super(); }

  ngOnInit(): void {
    this.listenToActiveNode();
  }

  private listenToActiveNode(): void {
    this.select(selectDswWorkPoolActiveWorkPool, (wp: WorkPool) => {
      this.activeWorkPool = wp;
      if (this.activeWorkPool) {
        this.activeStep = 1;
      } else {
        this.activeStep = 0;
      }
      this.detect();
    });
  }

  toggleSidePanel(): void {
    this.router.navigate([Routes.SNARKS, Routes.WORK_POOL], { queryParamsHandling: 'merge' });
    this.dispatch(DswWorkPoolToggleSidePanel);
  }

  removeActiveWorkPool(): void {
    this.dispatch(DswWorkPoolSetActiveWorkPool, { id: undefined });
    this.router.navigate([Routes.SNARKS, Routes.WORK_POOL], { queryParamsHandling: 'merge' });
  }

  openNavDropdown(event: MouseEvent): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      return;
    }

    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      width: 200,
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(event.target as HTMLElement)
        .withPositions([{
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 35,
          offsetX: -12
        }]),
    });
    event.stopPropagation();

    const portal = new TemplatePortal(this.dropdown, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }

  detach(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  goToScanState(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    const jobId = this.router.url.split('/').pop().split('?')[0];
    let url = `${window.location.origin}/${Routes.SNARKS}/${Routes.SCAN_STATE}`;
    url += `?node=${queryParams['node']}`;
    url += `&jobId=${jobId}`;
    window.open(url, '_blank');
  }
}
