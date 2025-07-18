import { MinaEnv } from '@ocfe-shared/types/core/environment/mina-env.type';

export const environment: Readonly<MinaEnv> = {
  production: true,
  sentry: {
    dsn: 'https://af49f4df760f48458792da44738e6634@o4504056952127488.ingest.sentry.io/4504100418617344',
    tracingOrigins: ['https://openmina-network-v2.web.app'],
  },
  configs: [
    {
      graphql: 'https://webrtc.webnode.openmina.com',
      name: 'Web Node Demo',
    },
  ],
};
