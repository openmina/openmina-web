import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mina-testing-tool-scenarios',
  templateUrl: './testing-tool-scenarios.component.html',
  styleUrls: ['./testing-tool-scenarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingToolScenariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
