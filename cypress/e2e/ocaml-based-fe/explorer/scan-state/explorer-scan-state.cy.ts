import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { ocfeStateSliceAsPromise } from '../../../../support/commands';
import { ExplorerScanState } from '@ocfe-explorer/scan-state/explorer-scan-state.state';

const condition = (state: ExplorerScanState) => state && state.scanState.length > 1;
const getScanState = (store: Store<MinaState>) => ocfeStateSliceAsPromise<ExplorerScanState>(store, condition, 'explorer', 'scanState');

describe('EXPLORER SCAN STATE TABLE', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + '/explorer/scan-state');
  });

  it('display explorer title', () => {
    cy.get('mina-toolbar span')
      .then((span: any) => expect(span).contain('Explorer'))
      .get('mina-submenu-tabs a.active')
      .then((a: any) => expect(a.text().toLowerCase()).equals('scan state'));
  });

  it('display scan state in trees', () => {
    cy.window()
      .its('store')
      .then(getScanState)
      .then((state: ExplorerScanState) => {
        if (state) {
          expect(state.scanState.length).above(1);
          cy.get('mina-explorer-scan-state-list div.overflow-y-auto > div')
            .should('have.length', state.scanState.length);
        }
      });
  });

});
