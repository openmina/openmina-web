import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { MinaState } from '@fufe-app/app.setup';
import { FuzzingFile } from '@fufe-shared/types/fuzzing/fuzzing-file.type';
import { FuzzingFileDetails } from '@fufe-shared/types/fuzzing/fuzzing-file-details.type';
import { FuzzingDirectory } from '@fufe-shared/types/fuzzing/fuzzing-directory.type';
import { TableSort } from '@openmina/shared';

export interface FuzzingState {
  directories: FuzzingDirectory[];
  activeDirectory: FuzzingDirectory;
  files: FuzzingFile[];
  filteredFiles: FuzzingFile[];
  activeFile: FuzzingFile;
  activeFileDetails: FuzzingFileDetails;
  sort: TableSort<FuzzingFile>;
  urlType: 'ocaml' | 'rust';
  filterText: string;
}

const select = <T>(selector: (state: FuzzingState) => T): MemoizedSelector<MinaState, T> => createSelector(
  selectFuzzingState,
  selector,
);

export const selectFuzzingState = createFeatureSelector<FuzzingState>('fuzzing');
export const selectFuzzingDirectories = select((state: FuzzingState): FuzzingDirectory[] => state.directories);
export const selectFuzzingActiveDirectory = select((state: FuzzingState): FuzzingDirectory => state.activeDirectory);
export const selectFuzzingFiles = select((state: FuzzingState): FuzzingFile[] => state.filteredFiles);
export const selectFuzzingActiveFile = select((state: FuzzingState): FuzzingFile => state.activeFile);
export const selectFuzzingActiveFileDetails = select((state: FuzzingState): FuzzingFileDetails => state.activeFileDetails);
export const selectFuzzingFilesSorting = select((state: FuzzingState): TableSort<FuzzingFile> => state.sort);
export const selectFuzzingUrlType = select((state: FuzzingState): 'ocaml' | 'rust' => state.urlType);
