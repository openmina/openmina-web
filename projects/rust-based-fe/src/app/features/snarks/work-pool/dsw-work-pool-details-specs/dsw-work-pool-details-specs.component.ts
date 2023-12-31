import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import {
  selectDswWorkPoolActiveWorkPoolDetail,
  selectDswWorkPoolActiveWorkPoolSpecs
} from '@rufe-snarks/work-pool/dsw-work-pool.state';
import { WorkPoolSpecs } from '@rufe-shared/types/snarks/work-pool/work-pool-specs.type';
import { downloadJson, downloadJsonFromURL, ExpandTracking, MinaJsonViewerComponent } from '@openmina/shared';
import { RustNodeService } from '@rufe-core/services/rust-node.service';
import { WorkPoolDetail } from '@rufe-shared/types/snarks/work-pool/work-pool-detail.type';

@Component({
  selector: 'mina-dsw-work-pool-details-specs',
  templateUrl: './dsw-work-pool-details-specs.component.html',
  styleUrls: ['./dsw-work-pool-details-specs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DswWorkPoolDetailsSpecsComponent extends StoreDispatcher implements OnInit {

  activeWorkPool: WorkPoolSpecs;
  expandTracking: ExpandTracking = {};
  jsonString: string;

  @ViewChild(MinaJsonViewerComponent) private minaJsonViewer: MinaJsonViewerComponent;
  private jobId: string;

  constructor(private rust: RustNodeService) {super();}

  ngOnInit(): void {
    this.select(selectDswWorkPoolActiveWorkPoolSpecs, (wp: WorkPoolSpecs) => {
      this.activeWorkPool = { ...wp };
      this.jsonString = JSON.stringify(this.activeWorkPool);
      this.detect();
    });
    this.select(selectDswWorkPoolActiveWorkPoolDetail, (detail: WorkPoolDetail) => {
      this.jobId = detail.id;
    });
  }

  downloadBin(): void {
    downloadJsonFromURL(this.rust.URL + '/snarker/job/spec?id=' + this.jobId, 'work-pool-specs.bin', () => null);
  }

  downloadJson(): void {
    downloadJson(this.jsonString, 'work-pool-specs.json');
  }

  expandEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(true);
  }

  collapseEntireJSON(): void {
    this.expandTracking = this.minaJsonViewer.toggleAll(false);
  }
}
