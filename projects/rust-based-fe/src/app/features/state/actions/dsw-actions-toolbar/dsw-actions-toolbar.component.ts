import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@rufe-shared/base-classes/store-dispatcher.class';
import { getMergedRoute, MergedRoute, SortDirection, TableSort } from '@openmina/shared';
import { DswActionGroup } from '@rufe-shared/types/state/actions/dsw-action-group.type';
import { DswActionsGetActions, DswActionsSearch, DswActionsSort } from '@rufe-state/actions/dsw-actions.actions';
import { selectDswActionsToolbarValues } from '@rufe-state/actions/dsw-actions.state';
import { debounceTime, distinctUntilChanged, filter, take } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Routes } from '@rufe-shared/enums/routes.enum';

@Component({
  selector: 'mina-dsw-actions-toolbar',
  templateUrl: './dsw-actions-toolbar.component.html',
  styleUrls: ['./dsw-actions-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-row h-xl border-bottom' },
})
export class DswActionsToolbarComponent extends StoreDispatcher implements OnInit {

  activeSlot: number;
  earliestSlot: number;
  currentSort: TableSort<DswActionGroup>;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.listenToRouteChanges();
    this.listenToToolbarValuesChanges();
  }

  private listenToRouteChanges(): void {
    this.select(getMergedRoute, (route: MergedRoute) => {
      if (route.params['id']) {
        this.getSlot(Number(route.params['id']));
      }
    }, take(1));
  }

  getSlot(slot: number): void {
    this.dispatch(DswActionsGetActions, { slot });
    this.router.navigate([Routes.STATE, Routes.ACTIONS, slot], { queryParamsHandling: 'merge' });
  }

  sort(sortBy: string): void {
    const sortDirection = sortBy !== this.currentSort.sortBy
      ? this.currentSort.sortDirection
      : this.currentSort.sortDirection === SortDirection.ASC ? SortDirection.DSC : SortDirection.ASC;
    this.dispatch(DswActionsSort, {
      sortBy: sortBy as keyof DswActionGroup,
      sortDirection,
    });
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      search: [''],
    });

    this.formGroup.get('search').valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      debounceTime(200),
      filter((value: string) => {
        if (value.length <= 2) {
          this.dispatch(DswActionsSearch, null);
          return false;
        }
        return true;
      }),
    ).subscribe((value: string) => {
      this.dispatch(DswActionsSearch, value.trim().toLowerCase());
    });
  }

  private listenToToolbarValuesChanges(): void {
    this.select(selectDswActionsToolbarValues, (data) => {
      this.activeSlot = data.activeSlot;
      this.earliestSlot = data.earliestSlot;
      this.currentSort = data.currentSort;
      this.detect();
    });
  }
}
