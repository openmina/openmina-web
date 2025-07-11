import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { getMergedRoute, MergedRoute, TableColumnList } from '@openmina/shared';
import { selectAppMenu } from '@ocfe-app/app.state';
import { filter } from 'rxjs';
import { AppMenu } from '@ocfe-shared/types/app/app-menu.type';
import { ExplorerBlockZkApp } from '@ocfe-shared/types/explorer/blocks/explorer-block-zk-app-type';
import { ExplorerBlocksSetActiveZkApp, ExplorerBlocksSortZkApps } from '@ocfe-explorer/blocks/explorer-blocks.actions';
import { selectExplorerBlocksZkAppsSorting } from '@ocfe-explorer/blocks/explorer-blocks.state';
import { Router } from '@angular/router';
import { MinaTableOcamlWrapper } from '@ocfe-shared/base-classes/mina-table-ocaml-wrapper.class';


@Component({
    selector: 'mina-explorer-blocks-zk-apps-table',
    templateUrl: './explorer-blocks-zk-apps-table.component.html',
    styleUrls: ['./explorer-blocks-zk-apps-table.component.scss'],
    host: { class: 'h-100 w-100 flex-column' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExplorerBlocksZkAppsTableComponent extends MinaTableOcamlWrapper<ExplorerBlockZkApp> implements OnInit, OnChanges {

  @Input() zkApps: ExplorerBlockZkApp[] = [];
  isMobile: boolean;

  protected readonly tableHeads: TableColumnList<ExplorerBlockZkApp> = [
    { name: 'ID', sort: 'id' },
    { name: 'hash' },
    { name: 'failures' },
    { name: 'updates' },
  ];

  private activeZkAppIndex: number;

  constructor(private router: Router) { super(); }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.listenToMenuChange();
    this.listenToRouteChanges();
  }

  protected override setupTable(): void {
    this.table.gridTemplateColumns = [100, 100, 115, 100];
    this.table.tableLevel = 2;
    this.table.sortClz = ExplorerBlocksSortZkApps;
    this.table.sortSelector = selectExplorerBlocksZkAppsSorting;
    this.table.rows = this.zkApps;
  }

  ngOnChanges(): void {
    if (this.table) {
      this.table.rows = this.zkApps;
      this.table.detect();
      if (this.zkApps.length > 0) {
        this.onRowClick(this.zkApps[this.activeZkAppIndex]);
      }
    }
  }

  protected override onRowClick(zk: ExplorerBlockZkApp): void {
    this.dispatch(ExplorerBlocksSetActiveZkApp, zk);
    if (zk) {
      this.router.navigate([], {
        queryParams: {
          activeZkApp: this.zkApps.indexOf(zk),
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  private listenToRouteChanges(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      this.activeZkAppIndex = Number(route.queryParams['activeZkApp']);
    });
  }

  private listenToMenuChange(): void {
    this.select(selectAppMenu, (menu: AppMenu) => {
      this.isMobile = menu.isMobile;
      this.detect();
    }, filter(menu => menu.isMobile !== this.isMobile));
  }
}
