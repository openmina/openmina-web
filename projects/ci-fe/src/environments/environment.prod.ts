import { MinaEnv } from '@cife-shared/types/core/environment/mina-env.type';
import { any } from '@openmina/shared';

export const environment: Readonly<MinaEnv> = {
  production: true,
  aggregator: any(window)['env']['aggregator'],
  drone: any(window)['env']['drone'],
};
