import { Inject, Injectable } from '@angular/core';
import { IStorage, STORAGE_CONFIG_TOKEN } from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { GroupsListFiltersModal } from './groups-list-filters-modal';

export function groupsListFiltersModalServiceInitializeApp(
  groupsListFiltersModalService: GroupsListFiltersModalService
) {
  return () => groupsListFiltersModalService.initializeApp();
}

@Injectable()
export class GroupsListFiltersModalService {
  @BindObservable()
  current: GroupsListFiltersModal = GroupsListFiltersModal.default();
  current$: Observable<GroupsListFiltersModal>;

  storageKeyName = 'groups-list-filters-modal';

  constructor(
    @Inject(STORAGE_CONFIG_TOKEN) private _storage: IStorage,
  ) {
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(value: GroupsListFiltersModal) {
    this._storage.setItem(
      this.storageKeyName, JSON.stringify(
        classToPlain(
          !value ? GroupsListFiltersModal.default() : value,
          { groups: ['manual'] }
        )
      )
    ).then(_ =>
      this.current = value
    );
  }
  initCurrent() {
    return new Promise<GroupsListFiltersModal>((resolve) => {
      this._storage.getItem(this.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          try {
            resolve(
              plainToClass(
                GroupsListFiltersModal,
                JSON.parse(data) as Object,
                { groups: ['manual'] }
              )
            );
          } catch (error) {
            resolve(this.getCurrent());
          }
        } else {
          resolve(this.getCurrent());
        }
      });
    });
  }
  initializeApp() {
    return new Promise((resolve) => {
      this.initCurrent().then(value => {
        this.setCurrent(value);
        resolve();
      });
    });
  }
}
