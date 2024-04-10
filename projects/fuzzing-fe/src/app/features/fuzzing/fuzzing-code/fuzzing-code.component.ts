import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { StoreDispatcher } from '@fufe-shared/base-classes/store-dispatcher.class';
import { FuzzingFile } from '@fufe-shared/types/fuzzing/fuzzing-file.type';
import { FuzzingFileDetails } from '@fufe-shared/types/fuzzing/fuzzing-file-details.type';
import {
  selectFuzzingActiveFile,
  selectFuzzingActiveFileDetails,
  selectFuzzingUrlType
} from '@fufe-fuzzing/fuzzing.state';
import { debounceTime, filter, fromEvent, tap, zip } from 'rxjs';
import { Routes } from '@fufe-shared/enums/routes.enum';
import { Router } from '@angular/router';
import { FuzzingGetFileDetails } from '@fufe-fuzzing/fuzzing.actions';
import { untilDestroyed } from '@ngneat/until-destroy';
import { getMergedRoute } from '@fufe-shared/router/router-state.selectors';
import { MergedRoute } from '@fufe-shared/router/merged-route';
import { MinaTooltipDirective, TooltipPosition } from '@openmina/shared';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'mina-fuzzing-code',
  templateUrl: './fuzzing-code.component.html',
  styleUrls: ['./fuzzing-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-100 border-left flex-column' },
})
export class FuzzingCodeComponent extends StoreDispatcher implements OnInit, AfterViewInit {

  file: FuzzingFile;
  fileDetails: FuzzingFileDetails;
  codeHighlighted: boolean = true;
  urlTypeStr: 'OCaml' | 'Rust';
  link: string;
  activeLineFromUrl: number;

  private urlType: 'ocaml' | 'rust';
  private popup: HTMLDivElement
  private lineToScroll: number;
  @ViewChild('codeHolder') private codeHolder: ElementRef<HTMLDivElement>;
  @ViewChild('codeContainer') private codeContainer: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router) { super(); }

  ngOnInit(): void {
    this.listenToFileChanges();
    this.listenToRouteType();
  }

  ngAfterViewInit(): void {
    this.listenToMouseMove();
    this.listenToRouteChange();
    this.popup = this.document.getElementById('mina-tooltip') as HTMLDivElement;
  }

  closeSidePanel(): void {
    this.router.navigate([Routes.FUZZING, this.urlType]);
    this.dispatch(FuzzingGetFileDetails, undefined);
  }

  private listenToRouteType(): void {
    this.select(selectFuzzingUrlType, (type: 'ocaml' | 'rust') => {
      this.urlType = type;
      this.urlTypeStr = type === 'ocaml' ? 'OCaml' : 'Rust';
    });
  }

  private listenToFileChanges(): void {
    zip(
      this.store.select(selectFuzzingActiveFile).pipe(
        filter(file => this.file !== file),
      ),
      this.store.select(selectFuzzingActiveFileDetails).pipe(
        filter(file => this.fileDetails !== file),
      ),
    )
      .pipe(untilDestroyed(this))
      .subscribe(([file, details]) => {
        this.file = file;
        this.fileDetails = details;
        this.codeHolder.nativeElement.scrollTo(0, 0);
        if (this.lineToScroll) {
          this.detect();
          this.codeHolder.nativeElement.scrollTo(0, (Number(this.lineToScroll) - 1) * 24);
          delete this.lineToScroll;
        }
        this.link = `${window.location.origin}${window.location.pathname}${window.location.hash}?line=`;
        this.detect();
      });
  }

  toggleCodeHighlighting(): void {
    this.codeHighlighted = !this.codeHighlighted;
  }

  private listenToMouseMove(): void {
    fromEvent(this.codeContainer.nativeElement, 'mousemove').pipe(
      untilDestroyed(this),
      tap(() => MinaTooltipDirective.hideTooltip(this.popup)),
      debounceTime(200),
    ).subscribe((ev: Event) => {
      const target = ev.target as HTMLSpanElement;
      if (target.hasAttribute('h')) {
        MinaTooltipDirective.showTooltip(this.popup, target, 'Hits: ' + target.getAttribute('h'), 500, TooltipPosition.BOTTOM);
      }
    });
  }

  private listenToRouteChange(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      const line = route.queryParams['line'];
      if (!this.activeLineFromUrl && line) {
        this.lineToScroll = Number(line);
      }
      this.activeLineFromUrl = Number(line);
    });
  }
}
