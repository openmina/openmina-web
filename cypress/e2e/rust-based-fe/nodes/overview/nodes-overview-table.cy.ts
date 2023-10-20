import { NodesOverviewState } from '@rufe-nodes/overview/nodes-overview.state';
import { Store } from '@ngrx/store';
import { MinaState } from '@rufe-app/app.setup';
import { rufeStateSliceAsPromise } from '../../../../support/commands';

const condition = (state: NodesOverviewState) => state && state.nodes.length > 1;
const getNodesOverview = (store: Store<MinaState>) => rufeStateSliceAsPromise<NodesOverviewState>(store, condition, 'nodes', 'overview');

describe('NODES OVERVIEW TABLE', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + '/nodes/overview');
  });

  it('display overview title', () => {
    // cy.wait(2000)
    //   .window()
    //   .its('store')
    //   .then(getNodes)
    //   .then((nodes: MinaNode[]) => {
    //     if (nodes.length > 1) {
    //       cy.get('mina-toolbar span')
    //         .then((span: any) => expect(span).contain('Overview'));
    //     }
    //   });
  });

  // it('display nodes in the table', () => {
  //   cy.window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         expect(state.nodes.length).above(1);
  //         cy.get('mina-nodes-overview .mina-table')
  //           .get('.row')
  //           .should('have.length.above', 1);
  //       }
  //     });
  // });
  //
  // it('by default, sort table by timestamp', () => {
  //   cy.window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.nodes.length - 1; i++) {
  //           if (state.nodes[i].timestamp > state.nodes[i + 1].timestamp) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('have expected length of nodes', () => {
  //   cy.window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         cy.window()
  //           .its('store')
  //           .then(getNodes)
  //           .then((nodes: MinaNode[]) => {
  //             const eachNodeHaveOneValue = state.nodes.every(n => state.nodes.filter(n1 => n1.url === n.url).length === 1);
  //             if (eachNodeHaveOneValue) {
  //               expect(state.nodes.length).to.eq(nodes.length);
  //             } else {
  //               expect(state.nodes.length).to.be.at.least(nodes.length);
  //             }
  //           });
  //       }
  //     });
  // });
  //
  // it('open node in a new tab', () => {
  //   cy.wait(20000)
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         cy.get('.mina-table .row:first-child span:first-child a')
  //           .should('have.attr', 'href', state.nodes[0].url)
  //           .should('have.attr', 'target', '_blank');
  //       }
  //     });
  // });
  //
  // it('calculate block latency correctly', () => {
  //   cy.window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         function applyNewLatencies(nodes: DashboardNode[]): DashboardNode[] {
  //           if (nodes.length === 0) {
  //             return nodes;
  //           }
  //           const fastestTime = nodes.slice().sort((n1, n2) => n1.timestamp - n2.timestamp)[1].timestamp;
  //           return nodes.map(m => ({
  //             ...m,
  //             latency: !m.timestamp ? undefined : (m.timestamp - fastestTime) / ONE_THOUSAND,
  //           }));
  //         }
  //
  //         const newNodes = applyNewLatencies(state.filteredNodes);
  //
  //         state.filteredNodes.forEach((m: DashboardNode, i: number) => {
  //           expect(m.latency).to.equal(newNodes[i].latency);
  //         });
  //       }
  //     });
  // });
  //
  // it('sort by name', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(1)')
  //     .click()
  //     .get('mina-overview-nodes-table .head > span:nth-child(1)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].name || '';
  //           const next = state.filteredNodes[i + 1].name || '';
  //           if (next.localeCompare(curr) > 0) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by status', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(2)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].status || '';
  //           const next = state.filteredNodes[i + 1].status || '';
  //           if (next < curr) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by hash reversed', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(3)')
  //     .click()
  //     .get('mina-overview-nodes-table .head > span:nth-child(3)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].hash || '';
  //           const next = state.filteredNodes[i + 1].hash || '';
  //           if (next.localeCompare(curr) > 0) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by height', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(4)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].blockchainLength === undefined ? state.filteredNodes[i].blockchainLength : Number.MAX_VALUE;
  //           const next = state.filteredNodes[i + 1].blockchainLength === undefined ? state.filteredNodes[i + 1].blockchainLength : Number.MAX_VALUE;
  //           if (next > curr) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by address', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(5)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].addr || '';
  //           const next = state.filteredNodes[i + 1].addr || '';
  //           if (next.localeCompare(curr) < 0) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by date', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(6)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].timestamp === undefined ? state.filteredNodes[i].timestamp : Number.MAX_VALUE;
  //           const next = state.filteredNodes[i + 1].timestamp === undefined ? state.filteredNodes[i + 1].timestamp : Number.MAX_VALUE;
  //           if (next > curr) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by latency', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(7)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].latency === undefined ? state.filteredNodes[i].latency : Number.MAX_VALUE;
  //           const next = state.filteredNodes[i + 1].latency === undefined ? state.filteredNodes[i + 1].latency : Number.MAX_VALUE;
  //           if (next > curr) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by block application', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(8)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].blockApplication === undefined ? state.filteredNodes[i].blockApplication : Number.MAX_VALUE;
  //           const next = state.filteredNodes[i + 1].blockApplication === undefined ? state.filteredNodes[i + 1].blockApplication : Number.MAX_VALUE;
  //           if (next < curr) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('sort by block application reversed', () => {
  //   cy.get('mina-overview-nodes-table .head > span:nth-child(8)')
  //     .click()
  //     .get('mina-overview-nodes-table .head > span:nth-child(8)')
  //     .click()
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.nodes.length > 1) {
  //         let sorted = true;
  //         for (let i = 0; i < state.filteredNodes.length - 1; i++) {
  //           const curr = state.filteredNodes[i].blockApplication === undefined ? state.filteredNodes[i].blockApplication : Number.MAX_VALUE;
  //           const next = state.filteredNodes[i + 1].blockApplication === undefined ? state.filteredNodes[i + 1].blockApplication : Number.MAX_VALUE;
  //           if (next > curr) {
  //             sorted = false;
  //             break;
  //           }
  //         }
  //         expect(sorted).to.be.true;
  //       }
  //     });
  // });
  //
  // it('open side panel', () => {
  //   cy.wait(5000)
  //     .get('mina-overview-nodes-table .head > span:nth-child(1)')
  //     .click()
  //     .get('mina-overview-nodes-table .row:not(.head)')
  //     .first()
  //     .click()
  //     .wait(1000)
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       if (state && state.activeNode && state.filteredNodes[0].status === AppNodeStatusTypes.SYNCED) {
  //         expect(state.activeNode.url).to.eq(state.filteredNodes[0].url);
  //         expect(state.activeNode.hash).to.eq(state.filteredNodes[0].hash);
  //       }
  //     })
  //     .get('mina-overview-nodes-side-panel')
  //     .should('be.visible')
  //     .get('mina-block-structured-trace')
  //     .should('be.visible');
  // });
  //
  // it('some nodes are online', () => {
  //   cy.wait(7000)
  //     .window()
  //     .its('store')
  //     .then(getNodesOverview)
  //     .then((state: DashboardNodesState) => {
  //       const someAreOnline = state.filteredNodes.some(n => n.status !== AppNodeStatusTypes.OFFLINE);
  //       if (state && someAreOnline) {
  //         expect(someAreOnline).to.be.true;
  //       }
  //     });
  // });
});
