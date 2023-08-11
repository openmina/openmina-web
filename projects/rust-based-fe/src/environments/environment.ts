import { MinaEnv } from '@rufe-shared/types/core/environment/mina-env.type';

export const environment: Readonly<MinaEnv> = {
  production: false,
  identifier: 'local',
  globalConfig: {
    features: {
      nodes: ['overview', 'live', 'bootstrap'],
      state: ['actions'],
      snarks: ['work-pool'],
    },
  },
  configs: [
    {
      name: 'webrtc2:10000',
      url: 'http://webrtc2.webnode.openmina.com:10000',
    },
    {
      name: 'webrtc2:10010',
      url: 'http://webrtc2.webnode.openmina.com:10010',
    },
    {
      name: 'webrtc2:10011',
      url: 'http://webrtc2.webnode.openmina.com:10011',
    }
  ],
};

