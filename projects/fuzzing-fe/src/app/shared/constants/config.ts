import { MinaEnv } from '@fufe-shared/types/core/environment/mina-env.type';
import { environment } from '@fufe-environment/environment';
import { any } from '@openmina/shared';

export const CONFIG: Readonly<MinaEnv> = {
  ...environment,
  parentDirectoryAbsolutePath: environment.parentDirectoryAbsolutePath?.replace(/\/$/, ''),
};

any(window).config = CONFIG;
