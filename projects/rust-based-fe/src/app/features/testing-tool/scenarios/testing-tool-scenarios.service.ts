import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { TestingToolScenario } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario.type';
import { TestingToolScenarioStep } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-step.type';
import { TestingToolScenarioEvent } from '@rufe-shared/types/testing-tool/scenarios/testing-tool-scenario-event.type';

@Injectable({ providedIn: 'root' })
export class TestingToolScenariosService {

  constructor(private http: HttpClient) { }

  getScenario(id: string): Observable<TestingToolScenario> {
    return of({
      info: {
        id: '1',
        description: 'Scenario 1'
      },
      steps: [
        {
          // kind: string;
          // dialer?: number;
          // listener?: string;
          // node_id?: number;
          // event?: string;
          kind: 'dialer',
          dialer: 1,
          listener: '2',
        },
        {
          kind: 'dialer',
          dialer: 2,
          listener: '3',
        },
        {
          kind: 'dialer',
          dialer: 3,
          listener: '4',
        }
      ]
    });
  }

  addStep(scenarioId: string, step: TestingToolScenarioStep): Observable<any> {
    return of({});
  }

  reloadScenarios(clusterId: string): Observable<any> {
    return of({});
  }

  runSteps(clusterId: string): Observable<any> {
    return of({});
  }

  getPendingEvents(clusterId: string): Observable<TestingToolScenarioEvent[]> {
    return of(
      {
        'node_id': 0,
        'pending_events': [
          {
            'id': '10_1',
            'event': 'P2p, Connection, OfferSdpReady, 2awmjihpsd9TkdaqEkvrJ2UguAsoigRtgoiKei4AxpA5EVzr6JZ, Ok'
          },
          {
            'id': '253',
            'event': 'P2p, Connection, OfferSdpReady, 2awmjihpsd9TkdaqEkvrJ2UguAsoigRtgoiKei4AxpA5EVzr6JZ, Ok'
          },
          {
            'id': '423',
            'event': 'P2p, Connection, OfferSdpReady, 2awmjihpsd9TkdaqEkvrJ2UguAsoigRtgoiKei4AxpA5EVzr6JZ, Ok'
          }
        ]
      }).pipe(
      map((response: any) => {
        return response.pending_events.map((ev: any) => ({
          ...ev,
          node_id: response.node_id
        }));
      }),
    );
  }
}
