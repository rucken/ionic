import { Provider } from '@angular/core';
import { USERS_CONFIG_TOKEN } from '@rucken/core';
import { IONIC_DEFAULT_USERS_CONFIG } from './users.config';

export const ENTITIES_PROVIDERS: Provider[] = [
  {
    provide: USERS_CONFIG_TOKEN,
    useValue: IONIC_DEFAULT_USERS_CONFIG
  }
];
