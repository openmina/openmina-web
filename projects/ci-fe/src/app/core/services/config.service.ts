import { Injectable } from '@angular/core';
import { CONFIG } from '@cife-shared/constants/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  get API(): string {
    return CONFIG.aggregator;
  }
}
