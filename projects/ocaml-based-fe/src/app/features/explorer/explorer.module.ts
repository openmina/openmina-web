import { NgModule } from '@angular/core';
import { ExplorerComponent } from './explorer.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { ExplorerRouting } from '@ocfe-explorer/explorer.routing';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerSnarksEffects } from '@ocfe-explorer/snarks/explorer-snarks.effects';


@NgModule({
  declarations: [
    ExplorerComponent,
  ],
  imports: [
    SharedModule,
    ExplorerRouting,
    EffectsModule.forFeature([ExplorerSnarksEffects]),
  ],
})
export class ExplorerModule {}
