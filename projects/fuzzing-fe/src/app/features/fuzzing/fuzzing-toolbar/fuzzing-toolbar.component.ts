import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreDispatcher } from '@fufe-shared/base-classes/store-dispatcher.class';
import { selectFuzzingFiles } from '@fufe-fuzzing/fuzzing.state';
import { FuzzingFile } from '@fufe-shared/types/fuzzing/fuzzing-file.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FuzzingFilterFiles } from '@fufe-fuzzing/fuzzing.actions';

@Component({
    selector: 'mina-fuzzing-toolbar',
    templateUrl: './fuzzing-toolbar.component.html',
    styleUrls: ['./fuzzing-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'flex-row align-center h-xl pl-12 border-bottom' },
    standalone: false
})
export class FuzzingToolbarComponent extends StoreDispatcher implements OnInit {

  overallCoverage: number;
  coverageColor: string;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.listenToFiles();
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      search: [''],
    });

    this.formGroup.get('search').valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      debounceTime(50),
    ).subscribe((value: string) => {
      this.dispatch(FuzzingFilterFiles, value.trim());
    });
  }

  private listenToFiles(): void {
    this.select(selectFuzzingFiles, (files: FuzzingFile[]) => {
      this.overallCoverage = files.reduce((acc: number, file: FuzzingFile) => acc + file.coverage, 0) / files.length;
      this.coverageColor = this.overallCoverage > 80 ? 'success' : this.overallCoverage > 50 ? 'aware' : 'warn';
      this.detect();
    });

  }
}
