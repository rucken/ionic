import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseEntityListComponent, ErrorsExtractor, Group, GROUPS_CONFIG_TOKEN, IBaseEntityGridFilter, IBaseEntityModalOptions, interpolate, ModalsService, translate } from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { EntityListComponent } from '../../../components/entity-list/entity-list.component';
import { IonicModalsService } from '../../../modules/modals/modals.service';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { GroupsListFiltersModal } from './groups-list-filters-modal/groups-list-filters-modal';
import { GroupsListFiltersModalComponent } from './groups-list-filters-modal/groups-list-filters-modal.component';
import { GroupsListFiltersModalService } from './groups-list-filters-modal/groups-list-filters-modal.service';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListComponent extends BaseEntityListComponent<Group> implements OnInit {

  @ViewChild('list')
  list: EntityListComponent<Group>;
  @Input()
  modalItem: IBaseEntityModalOptions = {
    class: 'primary',
    component: GroupModalComponent,
    initialState: {
      hideYes: true,
      hideNo: true
    }
  };
  @Input()
  modalView: IBaseEntityModalOptions = {
    class: 'medium',
    component: GroupModalComponent,
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
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>,
    private _groupsListFiltersModalService: GroupsListFiltersModalService
  ) {
    super(dynamicRepository.fork<Group>(Group), modalsService, Group);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        infinity: true,
        ...this.groupsConfig,
        autoload: false
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        infinity: true,
        ...this.groupsConfig,
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
  async onDeleteClickAsync(item: Group) {
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
  async createFiltersModal(item?: GroupsListFiltersModal) {
    item = item || new GroupsListFiltersModal();
    const modalRef = await this.modalsService.createAsync<GroupsListFiltersModalComponent>(
      GroupsListFiltersModalComponent,
      {
        class: 'secondary',
        initialState: {
          title: translate('Groups filters'),
          data: item
        }
      }
    );
    modalRef.instance.group(GroupsListFiltersModal);
    modalRef.instance.data = item;
    return modalRef;
  }
  async onFilterClickAsync(data?: any) {
    const modalRef = await this.createFiltersModal(data);
    modalRef.instance.yes.subscribe((modal: GroupsListFiltersModalComponent) => {
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
    const usersListFiltersModal = this._groupsListFiltersModalService.getCurrent();
    if (usersListFiltersModal.sortField) {
      filter['sort'] = usersListFiltersModal.sortField.id;
    }
    if (usersListFiltersModal.sortType) {
      filter['sort'] = (usersListFiltersModal.sortType.id === 'asc' ? '' : '-') + filter['sort'];
    }
    super.onChangeFilter(filter);
  }
}
