import { Provider } from '@angular/core';
import { GroupsService } from './groups.service';
import { PermissionsService } from './permissions.service';

export const SERVICES_PROVIDERS: Provider[] = [
  GroupsService,
  PermissionsService
];
