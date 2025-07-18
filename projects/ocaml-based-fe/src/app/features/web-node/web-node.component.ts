// import { onProgress$, WasmLoadProgressEvent } from '../../../assets/webnode/mina-rust';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild, Inject } from '@angular/core';
import { WebNodeService } from '@ocfe-app/features/web-node/web-node.service';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { APP_CHANGE_SUB_MENUS, AppChangeSubMenus } from '@ocfe-app/app.actions';
import { Routes } from '@ocfe-shared/enums/routes.enum';
import { ManualDetection } from '@openmina/shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WEB_NODE_SHARED_INIT, WebNodeSharedInit } from '@ocfe-web-node/web-node.actions';
import { DOCUMENT } from '@angular/common';


@UntilDestroy()
@Component({
    selector: 'mina-web-node',
    templateUrl: './web-node.component.html',
    styleUrls: ['./web-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WebNodeComponent extends ManualDetection implements OnInit, AfterViewInit {

  wasmLoaded: boolean;

  @ViewChild('iconContainer') private iconContainer: ElementRef<HTMLDivElement>;
  @ViewChild('speed') private speedElement: ElementRef<HTMLDivElement>;
  @ViewChild('remainingTime') private remainingTimeElement: ElementRef<HTMLDivElement>;

  constructor(private store: Store<MinaState>,
              private webNodeService: WebNodeService,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) { super(); }

  ngOnInit(): void {
    this.store.dispatch<AppChangeSubMenus>({ type: APP_CHANGE_SUB_MENUS, payload: [Routes.WALLET, Routes.PEERS, Routes.LOGS, Routes.STATE] });
    this.store.dispatch<WebNodeSharedInit>({ type: WEB_NODE_SHARED_INIT });
  };

  ngAfterViewInit(): void {
    this.downloadWasm();
  }

  private async downloadWasm(): Promise<void> {
    if (this.webNodeService.wasmIsAlreadyLoaded) {
      return;
    }
    // await import('../../../assets/webnode/mina-rust/wasm.js').then((wasm: any) => {
    //   console.log('wasm');
    //   console.log(wasm);
    //   (window as any).WebnodeWasm = wasm;
    // });
    this.webNodeService.instantiateWasm(null);

    this.webNodeService.wasmReady$.pipe(untilDestroyed(this)).subscribe(() => {
      this.wasmLoaded = true;
      this.detect();
    });
  }

  // private listenToWasmDownloadingProgress(): void {
  //   const startTime = Date.now();
  //
  //   onProgress$
  //     .pipe(untilDestroyed(this))
  //     .subscribe((event: WasmLoadProgressEvent) => {
  //
  //       // Calculate percentage
  //       const percentComplete = Math.floor((event.loaded / event.total) * 100);
  //
  //       // Get download speed
  //       const duration = (new Date().getTime() - startTime) / ONE_THOUSAND;
  //       const bps = event.loaded / duration;
  //       const kbps = bps / 1024;
  //       let speed;
  //       if (kbps > 1024) {
  //         speed = Math.floor(kbps / 1024) + 'MB/s';
  //       } else {
  //         speed = Math.floor(kbps) + 'KB/s';
  //       }
  //
  //       // Get remaining time
  //       const time = (event.total - event.loaded) / bps;
  //       const minutes = time / 60;
  //       let remaining;
  //       if (minutes >= 1) {
  //         remaining = Math.ceil(minutes) + 'm';
  //       } else {
  //         const seconds = time % 60;
  //         remaining = Math.ceil(seconds) + 's';
  //       }
  //
  //       this.loadingService.setProgress({
  //         percentage: percentComplete,
  //         speed,
  //         remaining,
  //       });
  //     });
  // }

}
