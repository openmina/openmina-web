import { MinaEnv } from '@rufe-shared/types/core/environment/mina-env.type';

export const environment: Readonly<MinaEnv> = {
  production: true,
  identifier: 'Rust based node',
  globalConfig: {
    features: {
      nodes: ['overview', 'live', 'bootstrap'],
      state: ['actions'],
      snarks: ['work-pool', 'scan-state'],
    },
  },
  configs: [
    {
      name: 'Snarker 1',
      url: 'http://webrtc2.webnode.openmina.com:10000',
    },
    {
      name: 'Snarker 2',
      url: 'http://webrtc3.webnode.openmina.com:10000',
    },
    {
      name: 'Snarker 3',
      url: 'http://webrtc4.webnode.openmina.com:10000',
    }
  ],
};

