import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MinaState } from '@ocfe-app/app.setup';
import { MinaNode } from '@ocfe-shared/types/core/environment/mina-env.type';
import { selectActiveNode } from '@ocfe-app/app.state';
import { filter } from 'rxjs';
import { CONFIG } from '@ocfe-shared/constants/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  private node: MinaNode;

  constructor(private store: Store<MinaState>) { this.listenToNodeChanging(); }

  private listenToNodeChanging(): void {
    this.store.select(selectActiveNode)
      .pipe(filter(Boolean))
      .subscribe((node: MinaNode) => this.node = node);
  }

  get GQL(): string {
    return this.node.graphql;
  }

  get TRACING_GQL(): string {
    return this.node['tracing-graphql'];
  }

  get DEBUGGER(): string {
    return this.node.debugger;
  }

  get MINA_EXPLORER(): string {
    return this.node.minaExplorer;
  }

  get AGGREGATOR(): string {
    return CONFIG.aggregator;
  }
}
