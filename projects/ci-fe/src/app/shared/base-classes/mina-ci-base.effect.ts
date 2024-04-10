import { FeatureAction, MinaBaseEffect } from '@openmina/shared';
import { MinaState } from '@cife-app/app.setup';

export abstract class MinaCIBaseEffect<A extends FeatureAction<any>> extends MinaBaseEffect<A, MinaState> {
}
