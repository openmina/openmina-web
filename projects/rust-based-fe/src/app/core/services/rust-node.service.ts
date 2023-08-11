import { Injectable } from '@angular/core';
import { MinaNode } from '@rufe-shared/types/core/environment/mina-env.type';

@Injectable({
  providedIn: 'root',
})
export class RustNodeService {

  private node: MinaNode;

  changeRustNode(node: MinaNode): void {
    this.node = node;
  }

  get URL(): string {
    return this.node.url;
  }

  get name(): string {
    return this.node.name;
  }
}
