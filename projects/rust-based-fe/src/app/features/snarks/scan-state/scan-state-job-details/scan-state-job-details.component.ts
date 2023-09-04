import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectScanStateActiveLeaf } from '@rufe-snarks/scan-state/scan-state.state';
import { downloadJson, ExpandTracking, MinaJsonViewerComponent } from '@openmina/shared';
import { ScanStateLeaf } from '@rufe-shared/types/snarks/scan-state/scan-state-leaf.type';
import { filter } from 'rxjs';

@Component({
  selector: 'mina-scan-state-job-details',
  templateUrl: './scan-state-job-details.component.html',
  styleUrls: ['./scan-state-job-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanStateJobDetailsComponent extends StoreDispatcher implements OnInit {

  activeLeaf: ScanStateLeaf;
  expandTracking: ExpandTracking = {};
  jsonString: string;

  @ViewChild(MinaJsonViewerComponent) private minaJsonViewer: MinaJsonViewerComponent;

  ngOnInit(): void {
    this.select(selectScanStateActiveLeaf, (detail: ScanStateLeaf) => {
      this.activeLeaf = { ...detail };
      delete this.activeLeaf.jobIndex;
      delete this.activeLeaf.treeIndex;
      delete this.activeLeaf.scrolling;
      this.jsonString = JSON.stringify(this.activeLeaf);
      this.detect();
    }, filter(Boolean));
  }

  downloadJson(): void {
    downloadJson(this.jsonString, 'scan-state-job.json');
  }

  expandEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(true);
  }

  collapseEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(false);
  }
}