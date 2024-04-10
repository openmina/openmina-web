import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { selectScanStateActiveLeaf } from '@rufe-snarks/scan-state/scan-state.state';
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

  ngOnInit(): void {
    this.select(selectScanStateActiveLeaf, (detail: ScanStateLeaf) => {
      this.activeLeaf = { ...detail };
      delete this.activeLeaf.jobIndex;
      delete this.activeLeaf.treeIndex;
      delete this.activeLeaf.scrolling;
      this.detect();
    }, filter(Boolean));
  }
}