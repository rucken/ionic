import { Inject, Injectable } from '@angular/core';
import { IStorage, STORAGE_CONFIG_TOKEN } from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { UsersListFiltersModal } from './users-list-filters-modal';

export function usersListFiltersModalServiceInitializeApp(
  usersListFiltersModalService: UsersListFiltersModalService
) {
  return () => usersListFiltersModalService.initializeApp();
}

@Injectable()
export class UsersListFiltersModalService {
  @BindObservable()
  current: UsersListFiltersModal = UsersListFiltersModal.default();
  current$: Observable<UsersListFiltersModal>;

  storageKeyName = 'users-list-filters-modal';

  constructor(
    @Inject(STORAGE_CONFIG_TOKEN) private _storage: IStorage,
  ) {
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(value: UsersListFiltersModal) {
    this._storage.setItem(
      this.storageKeyName, JSON.stringify(
        classToPlain(
          !value ? UsersListFiltersModal.default() : value,
          { groups: ['manual'] }
        )
      )
    ).then(_ =>
      this.current = value
    );
  }
  initCurrent() {
    return new Promise<UsersListFiltersModal>((resolve) => {
      this._storage.getItem(this.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          try {
            resolve(
              plainToClass(
                UsersListFiltersModal,
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
