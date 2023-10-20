import { Store } from '@ngrx/store';
import { MinaState } from '@cife-app/app.setup';
import { cifeStateSliceAsPromise } from '../../../../support/commands';
import { ReportingDashboardState } from '@cife-reporting/dashboard/reporting-dashboard.state';

const condition = (state: ReportingDashboardState) => state && state.reports.length > 1;
const getTrends = (store: Store<MinaState>) => cifeStateSliceAsPromise<ReportingDashboardState>(store, condition, 'reporting', 'dashboard');

describe('REPORTING TRENDS', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + '/trends');
  });

  it('display 3 graphs', () => {
    cy.window()
      .its('store')
      .then(getTrends)
      .then((state: ReportingDashboardState) => {
        if (condition(state)) {
          cy.get('mina-reporting-overview-graph-list > *')
            .should('have.length', 3);
        }
      });
  });

  it('preselect weekly mode', () => {
    cy.window()
      .its('store')
      .then(getTrends)
      .then((state: ReportingDashboardState) => {
        if (condition(state)) {
          cy.get('mina-reporting-overview-graph-list > div > div > div button:nth-child(1)')
            .should('have.class', 'btn-selected')
            .get('mina-reporting-overview-graph-list > div > div > div button:nth-child(2)')
            .should('not.have.class', 'btn-selected')
            .get('svg g.xAxis g.tick text')
            .then((text: any) => {
              expect(text.text()).to.contain('weeks ago');
            });
        }
      });
  });

  it('select monthly mode', () => {
    cy.window()
      .its('store')
      .then(getTrends)
      .then((state: ReportingDashboardState) => {
        if (condition(state)) {
          const months: string[] = [];
          for (let i = 0; i < 12; i++) {
            months.push(new Date(2000, i, 1).toLocaleString('default', { month: 'long' }));
          }
          cy.get('mina-reporting-overview-graph-list > div > div > div button:nth-child(1)')
            .should('have.class', 'btn-selected')
            .get('mina-reporting-overview-graph-list > div > div > div button:nth-child(2)')
            .click()
            .wait(1000)
            .get('mina-reporting-overview-graph-list > div > div > div button:nth-child(1)')
            .should('not.have.class', 'btn-selected')
            .get('mina-reporting-overview-graph-list > div > div > div button:nth-child(2)')
            .should('have.class', 'btn-selected')
            .get('mina-reporting-overview-graph-list > div:nth-child(1) svg g.xAxis g.tick text')
            .then((text: any) => {
              months.forEach(month => {
                expect(text.text()).to.contain(month);
              });
            })
            .get('mina-reporting-overview-graph-list > div:nth-child(2) svg g.xAxis g.tick text')
            .then((text: any) => {
              months.forEach(month => {
                expect(text.text()).to.contain(month);
              });
            })
            .get('mina-reporting-overview-graph-list > div:nth-child(3) svg g.xAxis g.tick text')
            .then((text: any) => {
              months.forEach(month => {
                expect(text.text()).to.contain(month);
              });
            });
        }
      });
  });

  it('display graphs with circles and path and have correct colors', () => {
    cy.window()
      .its('store')
      .then(getTrends)
      .then((state: ReportingDashboardState) => {
        if (condition(state)) {
          const colors = ['var(--special-selected-alt-2-primary)', 'var(--special-selected-alt-1-primary)', 'var(--special-selected-alt-3-primary)'];
          cy.get('mina-reporting-overview-graph-list > div')
            .each((div: any, i: number) => {
              expect(div.find('mina-reporting-overview-graph svg g g.circles circle').length).to.be.greaterThan(40);
              expect(div.find('mina-reporting-overview-graph svg g g.circles circle').length).to.be.greaterThan(40);
              expect(div.find('mina-reporting-overview-graph svg g g.circles circle').length).to.be.greaterThan(40);
              expect(div.find('mina-reporting-overview-graph svg g g.circles circle')).has.attr('style', 'fill: ' + colors[i] + ';');
              expect(div.find('mina-reporting-overview-graph svg g .data-path')).has.attr('stroke', colors[i]);
            });
        }
      });
  });

  it('open side panel', () => {
    cy.window()
      .its('store')
      .then(getTrends)
      .then((state: ReportingDashboardState) => {
        if (condition(state)) {
          cy.get('mina-reporting-overview mina-reporting-overview-side-panel mina-reporting-detail')
            .should('not.be.visible')
            .visit(Cypress.config().baseUrl + '/trends/' + state.reports[0].number)
            .get('mina-reporting-overview mina-reporting-overview-side-panel mina-reporting-detail')
            .should('be.visible')
            .get('mina-reporting-overview-graph-list mina-reporting-overview-graph svg g.clicker')
            .should('have.attr', 'style', 'opacity: 1;');
        }
      });
  });
});
