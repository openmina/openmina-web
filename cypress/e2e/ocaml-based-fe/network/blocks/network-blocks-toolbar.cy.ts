import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { ocfeStateSliceAsPromise } from '../../../../support/commands';
import { NetworkBlocksState } from '@ocfe-network/blocks/network-blocks.state';

const condition = (state: NetworkBlocksState) => state && state.blocks.length > 2;
const networkBlocksState = (store: Store<MinaState>) => ocfeStateSliceAsPromise<NetworkBlocksState>(store, condition, 'network', 'blocks');


describe('NETWORK BLOCKS TOOLBAR', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + '/network/blocks');
  });

  it('goes to previous block', () => {
    cy.wait(1000)
      .window()
      .its('store')
      .then(networkBlocksState)
      .then((state: NetworkBlocksState) => {
        if (state && state.blocks.length > 2) {
          let activeBlock = state.activeBlock;
          cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
            .should('have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child button:last-child')
            .should('have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child .pagination-group button:first-child')
            .click({ force: true })
            .wait(1000)
            .window()
            .its('store')
            .then(networkBlocksState)
            .then((state: NetworkBlocksState) => {
              if (state && activeBlock !== undefined) {
                expect(activeBlock).to.equal(state.activeBlock + 1);
                cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
                  .should('not.have.class', 'disabled')
                  .get('mina-network-blocks-toolbar > div:first-child button:last-child')
                  .should('not.have.class', 'disabled');
              }
            });
        }
      });
  });

  it('goes to next block', () => {
    cy.wait(1000)
      .window()
      .its('store')
      .then(networkBlocksState)
      .then((state: NetworkBlocksState) => {
        if (state && state.blocks.length > 2) {
          let activeBlock = state.activeBlock;
          cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
            .should('have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child button:last-child')
            .should('have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child .pagination-group button:first-child')
            .click({ force: true })
            .wait(1000)
            .window()
            .its('store')
            .then(networkBlocksState)
            .then((state: NetworkBlocksState) => {
              if (state && activeBlock !== undefined) {
                expect(activeBlock).to.equal(state.activeBlock + 1);
                cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
                  .should('not.have.class', 'disabled')
                  .click({ force: true })
                  .wait(1000)
                  .window()
                  .its('store')
                  .then(networkBlocksState)
                  .then((state: NetworkBlocksState) => {
                    if (state && activeBlock !== undefined) {
                      expect(activeBlock).to.equal(state.activeBlock);
                      cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
                        .should('have.class', 'disabled')
                        .get('mina-network-blocks-toolbar > div:first-child button:last-child')
                        .should('have.class', 'disabled');
                    }
                  });
              }
            });
        }
      });
  });

  it('goes to earliest block', () => {
    cy.wait(1000)
      .window()
      .its('store')
      .then(networkBlocksState)
      .then((state: NetworkBlocksState) => {
        if (state && state.blocks.length > 2) {
          let earliestBlock = state.earliestBlock;
          cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
            .should('have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child button:last-child')
            .should('have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child .pagination-group button:first-child')
            .click({ force: true })
            .wait(1000)
            .get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
            .should('not.have.class', 'disabled')
            .get('mina-network-blocks-toolbar > div:first-child button:last-child')
            .get('mina-network-blocks-toolbar > div:first-child .pagination-group button:first-child')
            .click({ force: true })
            .wait(1000)
            .get('mina-network-blocks-toolbar > div:first-child > button')
            .should('not.have.class', 'disabled')
            .click({ force: true })
            .wait(1000)
            .window()
            .its('store')
            .then(networkBlocksState)
            .then((state: NetworkBlocksState) => {
              if (state && earliestBlock !== undefined) {
                expect(earliestBlock).to.equal(state.activeBlock);
                cy.get('mina-network-blocks-toolbar > div:first-child .pagination-group button:last-child')
                  .should('have.class', 'disabled')
                  .get('mina-network-blocks-toolbar > div:first-child button:last-child')
                  .should('have.class', 'disabled');
              }
            });
        }
      });
  });
});
