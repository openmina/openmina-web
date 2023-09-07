import { MinaEnv } from '@fufe-shared/types/core/environment/mina-env.type';
import { any } from '@openmina/shared';

export const environment: Readonly<MinaEnv> = {
  production: true,
  identifier: any(window)['env']['identifier'] || 'Open Mina Fuzzing',
  server: any(window)['env']['server'] || (origin + '/assets/reports'),
  parentDirectoryAbsolutePath: any(window)['env']['parentDirectoryAbsolutePath'] || './',
};
