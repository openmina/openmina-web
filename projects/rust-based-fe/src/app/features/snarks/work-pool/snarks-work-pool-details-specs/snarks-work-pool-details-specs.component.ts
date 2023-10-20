import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import {
  selectSnarksWorkPoolActiveWorkPoolDetail,
  selectSnarksWorkPoolActiveWorkPoolSpecs
} from '@rufe-snarks/work-pool/snarks-work-pool.state';
import { WorkPoolSpecs } from '@rufe-shared/types/snarks/work-pool/work-pool-specs.type';
import { downloadJsonFromURL } from '@openmina/shared';
import { RustNodeService } from '@rufe-core/services/rust-node.service';
import { WorkPoolDetail } from '@rufe-shared/types/snarks/work-pool/work-pool-detail.type';

@Component({
  selector: 'mina-snarks-work-pool-details-specs',
  templateUrl: './snarks-work-pool-details-specs.component.html',
  styleUrls: ['./snarks-work-pool-details-specs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnarksWorkPoolDetailsSpecsComponent extends StoreDispatcher implements OnInit {

  activeWorkPool: WorkPoolSpecs;

  private jobId: string;

  constructor(private rust: RustNodeService) {super();}

  ngOnInit(): void {
    this.select(selectSnarksWorkPoolActiveWorkPoolSpecs, (wp: WorkPoolSpecs) => {
      this.activeWorkPool = { ...wp };
      this.detect();
    });
    this.select(selectSnarksWorkPoolActiveWorkPoolDetail, (detail: WorkPoolDetail) => {
      this.jobId = detail.id;
    });
  }

  downloadBin(): void {
    downloadJsonFromURL(this.rust.URL + '/snarker/job/spec?id=' + this.jobId, 'work-pool-specs.bin', () => null);
  }

}
