import { MinaEnv } from '@ocfe-shared/types/core/environment/mina-env.type';
import { any } from '@openmina/shared';

export const environment: Readonly<MinaEnv> = {
  production: true,
  identifier: any(window)['env']['identifier'],
  aggregator: any(window)['env']['aggregator'] || '',
  configs: any(window)['env']['configs'] || [],
  globalConfig: any(window)['env']['globalConfig'] || undefined,
  isVanilla: any(window)['env']['isVanilla'],
  nodeLister: any(window)['env']['nodeLister'],
};
