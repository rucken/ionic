import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewChild, isDevMode } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseEntityListComponent, ErrorsExtractor, IBaseEntityGridFilter, IBaseEntityModalOptions, interpolate, ModalsService, translate, USERS_CONFIG_TOKEN, BasePromptFormModalComponent } from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { EntityListComponent } from '../../../components/entity-list/entity-list.component';
import { CustomUser } from '../../../models/custom-user';
import { IonicModalsService } from '../../../modules/modals/modals.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UsersListFiltersModal } from './users-list-filters-modal/users-list-filters-modal';
import { UsersListFiltersModalComponent } from './users-list-filters-modal/users-list-filters-modal.component';
import { UsersListFiltersModalService } from './users-list-filters-modal/users-list-filters-modal.service';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent extends BaseEntityListComponent<CustomUser> implements OnInit {

  @ViewChild('list')
  list: EntityListComponent<CustomUser>;
  @Input()
  modalItem: IBaseEntityModalOptions = {
    class: 'primary',
    component: UserModalComponent,
    initialState: {
      hideYes: true,
      hideNo: true
    }
  };
  @Input()
  modalView: IBaseEntityModalOptions = {
    class: 'medium',
    component: UserModalComponent,
    initialState: {
      noClass: 'medium',
      hideYes: true,
      hideNo: true
    }
  };
  @Input()
  title = translate('Users');
  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(USERS_CONFIG_TOKEN) protected usersConfig: IRestProviderOptions<CustomUser>,
    private _usersListFiltersModalService: UsersListFiltersModalService
  ) {
    super(dynamicRepository.fork<CustomUser>(CustomUser), modalsService, CustomUser);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        infinity: true,
        ...this.usersConfig,
        autoload: false
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        infinity: true,
        ...this.usersConfig,
        autoload: false
      });
    }
    this.onChangeFilter();
  }
  setSearchText(event: { detail: { value: string } }) {
    this.list.searchField.setValue(
      event.detail.value
    );
  }
  async onDeleteClickAsync(item: CustomUser) {
    const title = interpolate(this.translateService.instant(this.strings.deleteTitle), item);
    const message = interpolate(this.translateService.instant(this.strings.deleteMessage), item);
    try {
      const result = await (this.modalsService as IonicModalsService).confirmAsync({
        title,
        message
      });
      if (result) {
        this.repository.delete(item.id).subscribe(
          deletedItem => {
            if (this.mockedItems) {
              this.mockedItems = this.repository.items;
              this.mockedItemsChange.emit(this.mockedItems);
            }
          },
          error => this.onError(error)
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async createFiltersModal(item?: UsersListFiltersModal) {
    item = item || new UsersListFiltersModal();
    const modalRef = await this.modalsService.createAsync<UsersListFiltersModalComponent>(
      UsersListFiltersModalComponent,
      {
        class: 'secondary',
        initialState: {
          title: translate('Users filters'),
          data: item
        }
      }
    );
    modalRef.instance.group(UsersListFiltersModal);
    modalRef.instance.data = item;
    return modalRef;
  }
  async onFilterClickAsync(data?: any) {
    const modalRef = await this.createFiltersModal(data);
    modalRef.instance.yes.subscribe((modal: UsersListFiltersModalComponent) => {
      modal.hide();
      this.onChangeFilter();
    });
  }
  onFilterClick(data?: any): void {
    this.onFilterClickAsync(data).then();
  }
  onChangeFilter(filter?: IBaseEntityGridFilter) {
    if (!filter) {
      filter = {};
    }
    const usersListFiltersModal = this._usersListFiltersModalService.getCurrent();
    if (usersListFiltersModal.group) {
      filter['group'] = usersListFiltersModal.group.id;
    }
    if (usersListFiltersModal.sortField) {
      filter['sort'] = usersListFiltersModal.sortField.id;
    }
    if (usersListFiltersModal.sortType) {
      filter['sort'] = (usersListFiltersModal.sortType.id === 'asc' ? '' : '-') + filter['sort'];
    }
    super.onChangeFilter(filter);
  }

  async onUpdateClickAsync(item: CustomUser) {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    let modalRef = !useCustomModalComponent ? await this.createUpdateModal(item) : undefined;
    if (!modalRef) {
      modalRef = await this.defaultCreateUpdateModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createUpdateModal" is not defined', this);
      }
    }
    modalRef.instance.yes.subscribe((modal: BasePromptFormModalComponent<CustomUser>) => {
      modal.processing = true;
      this.repository.update(item.id, modal.getData()).subscribe(
        updatedItem => {
          modal.processing = false;
          if (this.mockedItems) {
            this.mockedItems = this.repository.items;
            this.mockedItemsChange.emit(this.mockedItems);
          }
          modal.hide();
        },
        error => this.onUpdateError(modal, error)
      );
    });
  }
}
