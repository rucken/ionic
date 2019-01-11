import { Inject, Injectable } from '@angular/core';
import { Permission, PERMISSIONS_CONFIG_TOKEN } from '@rucken/core';
import { DynamicRepository, IRestProviderOptions, Repository } from 'ngx-repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  items$: Observable<Permission[]>;
  repository: Repository<Permission>;
  constructor(
    protected dynamicRepository: DynamicRepository,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Permission>
  ) {
    this.repository = dynamicRepository.fork<Permission>(Permission);
    this.repository.useRest({
      infinity: true,
      ...this.groupsConfig,
      autoload: false,
      paginationMeta: {
        perPage: 10000
      }
    });
    this.items$ = this.repository.items$;
  }
}
