import { FeatureAction, MinaBaseEffect } from '@openmina/shared';
import { MinaState } from '@ocfe-app/app.setup';

export abstract class MinaOcamlBaseEffect<A extends FeatureAction<any>> extends MinaBaseEffect<A, MinaState> {
}
