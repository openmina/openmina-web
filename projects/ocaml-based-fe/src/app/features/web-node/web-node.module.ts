import { NgModule } from '@angular/core';

import { WebNodeComponent } from '@ocfe-web-node/web-node.component';
import { SharedModule } from '@ocfe-shared/shared.module';
import { WebNodeRouting } from '@ocfe-web-node/web-node.routing';
import { EffectsModule } from '@ngrx/effects';
import { WebNodeEffects } from '@ocfe-web-node/web-node.effects';


@NgModule({
  declarations: [
    WebNodeComponent,
  ],
  imports: [
    WebNodeRouting,
    SharedModule,
    EffectsModule.forFeature([WebNodeEffects]),
  ],
})
export class WebNodeModule {}
