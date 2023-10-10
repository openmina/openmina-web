import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MinaTableRustWrapper } from '@rufe-shared/base-classes/mina-table-rust-wrapper.class';
import { SecDurationConfig, TableColumnList } from '@openmina/shared';
import { selectTestingToolScenariosScenario } from '@rufe-testing-tool/scenarios/testing-tool-scenarios.state';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';
import { TestingToolScenarioStep } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-step.type';

@Component({
  selector: 'mina-scenarios-steps-table',
  templateUrl: './scenarios-steps-table.component.html',
  styleUrls: ['./scenarios-steps-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-column h-minus-xl' }
})
export class ScenariosStepsTableComponent extends MinaTableRustWrapper<TestingToolScenarioStep> implements OnInit {

  readonly secConfig: SecDurationConfig = {
    color: true,
    undefinedAlternative: '-',
    default: 100,
    warn: 500,
    severe: 1000
  };
  protected readonly tableHeads: TableColumnList<TestingToolScenarioStep> = [
    { name: '' },
    { name: 'node ID' },
    { name: 'kind' },
    { name: 'dialer' },
    { name: 'listener' },
    { name: 'event' },
  ];

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToScenariosChanges();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [165, 140, 110, 150, 150, 100, 110, 150, 100];
  }

  private listenToScenariosChanges(): void {
    this.select(selectTestingToolScenariosScenario, (scenario: TestingToolScenario) => {
      this.table.rows = scenario.steps;
      this.table.detect();
      this.detect();
    });
  }

  protected override onRowClick(row: TestingToolScenarioStep): void {
  }

}
