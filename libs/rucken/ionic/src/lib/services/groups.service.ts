import { Inject, Injectable } from '@angular/core';
import { Group, GROUPS_CONFIG_TOKEN } from '@rucken/core';
import { DynamicRepository, IRestProviderOptions, Repository } from 'ngx-repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  items$: Observable<Group[]>;
  repository: Repository<Group>;
  constructor(
    protected dynamicRepository: DynamicRepository,
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
  ) {
    this.repository = dynamicRepository.fork<Group>(Group);
    this.repository.useRest({
      infinity: true,
      ...this.groupsConfig,
      paginationMeta: {
        perPage: 10000
      }
    });
    this.items$ = this.repository.items$;
  }
}
