import { NgModule } from '@angular/core';

import { FuzzingComponent } from '@fufe-fuzzing/fuzzing.component';
import { FuzzingFilesTableComponent } from '@fufe-fuzzing/fuzzing-files-table/fuzzing-files-table.component';
import { FuzzingCodeComponent } from '@fufe-fuzzing/fuzzing-code/fuzzing-code.component';
import { FuzzingRouting } from '@fufe-fuzzing/fuzzing.routing';
import { SharedModule } from '@fufe-shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { FuzzingEffects } from '@fufe-fuzzing/fuzzing.effects';
import { FuzzingToolbarComponent } from '@fufe-fuzzing/fuzzing-toolbar/fuzzing-toolbar.component';
import { FuzzingDirectoriesTableComponent } from '@fufe-fuzzing/fuzzing-directories-table/fuzzing-directories-table.component';
import { CopyComponent, HorizontalResizableContainerComponent } from '@openmina/shared';


@NgModule({
  declarations: [
    FuzzingComponent,
    FuzzingFilesTableComponent,
    FuzzingCodeComponent,
    FuzzingToolbarComponent,
    FuzzingDirectoriesTableComponent,
  ],
  imports: [
    SharedModule,
    FuzzingRouting,
    EffectsModule.forFeature(FuzzingEffects),
    HorizontalResizableContainerComponent,
    CopyComponent,
  ],
})
export class FuzzingModule {}
