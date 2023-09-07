/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { Store } from '@ngrx/store';
import { MinaState as OcfeMinaState } from '@ocfe-app/app.setup';
import { MinaState as CifeMinaState } from '@cife-app/app.setup';
import { map, Subscription } from 'rxjs';
import { MinaNode as OfceMinaNode } from '@ocfe-shared/types/core/environment/mina-env.type';
import { NodeStatus } from '@ocfe-shared/types/app/node-status.type';
import { any } from '@openmina/shared';

declare global {
  namespace Cypress {
    interface Chainable {
      then(store: Store<OcfeMinaState> | any): Chainable<any>;

      then(store: Store<OcfeMinaState> | any, { timeout }: { timeout: number }): Chainable<any>;

      its(store: 'store'): Chainable<Store<OcfeMinaState>>;
    }
  }
}

type AnyMinaState = OcfeMinaState | CifeMinaState;

export const PROMISE = (resolveFunction: (resolve: (result?: unknown) => void) => void) => new Cypress.Promise(resolveFunction);
export const getActiveNode = (store: Store<OcfeMinaState>) => {
  const promiseBody = (resolve: (result?: OfceMinaNode) => void): void => {
    const observer = (node: OfceMinaNode) => {
      if (node) {
        return resolve(node);
      }
      setTimeout(() => resolve(), 3000);
    };
    store.select('app').pipe(map(app => app.activeNode)).subscribe(observer);
  };
  return PROMISE(promiseBody);
};
export const getActiveNodeStatus = (store: Store<OcfeMinaState>) => {
  const promiseBody = (resolve: (result?: NodeStatus) => void): void => {
    const observer = (status: NodeStatus) => {
      if (status) {
        return resolve(status);
      }
      setTimeout(() => resolve(), 3000);
    };
    store.select('app').pipe(map(app => app.nodeStatus)).subscribe(observer);
  };
  return PROMISE(promiseBody);
};
export const getNodes = (store: Store<OcfeMinaState>) => {
  const promiseBody = (resolve: (result?: unknown) => void): void => {
    const observer = (nodes: OfceMinaNode[]) => {
      if (nodes.length) {
        return resolve(nodes);
      }
      setTimeout(() => resolve(), 3000);
    };
    store.select('app').pipe(map(app => app.nodes)).subscribe(observer);
  };
  return PROMISE(promiseBody);
};

// CI FE
export const cifeStateSliceAsPromise = <T = CifeMinaState | CifeMinaState[keyof CifeMinaState]>(
  store: Store<CifeMinaState>, resolveCondition: (state: T) => boolean, slice: keyof CifeMinaState, subSlice: string, timeout: number = 3000,
) => {
  return new Cypress.Promise((resolve: (result?: T | void) => void): void => {
    const observer = (state: T) => {
      if (resolveCondition(state)) {
        return resolve(state);
      }
      setTimeout(() => resolve(), timeout);
    };
    store.select(slice).pipe(
      map((subState: CifeMinaState[keyof CifeMinaState]) => {
        cy.log('');
        return subSlice ? any(subState)[subSlice] : subState;
      }),
    ).subscribe(observer);
  });
};

// OCaml-based FE
export const ocfeStateSliceAsPromise = <T = OcfeMinaState | OcfeMinaState[keyof OcfeMinaState]>(
  store: Store<OcfeMinaState>, resolveCondition: (state: T) => boolean, slice: keyof OcfeMinaState, subSlice: string, timeout: number = 3000,
) => {
  return new Cypress.Promise((resolve: (result?: T | void) => void): void => {
    const observer = (state: T) => {
      if (resolveCondition(state)) {
        return resolve(state);
      }
      setTimeout(() => resolve(), timeout);
    };
    store.select(slice).pipe(
      map((subState: OcfeMinaState[keyof OcfeMinaState]) => {
        cy.log('');
        return subSlice ? any(subState)[subSlice] : subState;
      }),
    ).subscribe(observer);
  });
};

export const storeNetworkSubscription = (store: Store<OcfeMinaState>, observer: any): Subscription => store.select('network').subscribe(observer);

export const storeWebNodeWalletSubscription = (store: Store<OcfeMinaState>, observer: any): Subscription => store.select('webNode').pipe(map(wn => wn.wallet)).subscribe(observer);
export const storeWebNodeLogsSubscription = (store: Store<OcfeMinaState>, observer: any): Subscription => store.select('webNode').pipe(map(wn => wn.log)).subscribe(observer);
export const storeWebNodePeersSubscription = (store: Store<OcfeMinaState>, observer: any): Subscription => store.select('webNode').pipe(map(wn => wn.peers)).subscribe(observer);
export const storeWebNodeSharedSubscription = (store: Store<OcfeMinaState>, observer: any): Subscription => store.select('webNode').pipe(map(wn => wn.shared)).subscribe(observer);

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));
