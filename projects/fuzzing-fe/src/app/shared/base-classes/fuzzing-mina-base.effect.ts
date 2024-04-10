import { MinaState } from '@fufe-app/app.setup';
import { FeatureAction, MinaBaseEffect } from '@openmina/shared';

export abstract class FuzzingMinaBaseEffect<A extends FeatureAction<any>> extends MinaBaseEffect<A, MinaState> {
}
