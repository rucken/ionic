import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BasePromptFormModalComponent } from '@rucken/core';
import { GroupsListFiltersModal } from './groups-list-filters-modal';
import { GroupsListFiltersModalService } from './groups-list-filters-modal.service';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'groups-list-filters-modal',
  templateUrl: './groups-list-filters-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListFiltersModalComponent extends
  BasePromptFormModalComponent<GroupsListFiltersModal> implements OnInit {
  @Input()
  class: string = undefined;
  sortTypes = GroupsListFiltersModal.sortTypes;
  sortFields = GroupsListFiltersModal.sortFields;

  constructor(
    private _groupsListFiltersModalService: GroupsListFiltersModalService
  ) {
    super();
    this.group(GroupsListFiltersModal);
  }
  ngOnInit() {
    this.data = this._groupsListFiltersModalService.getCurrent();
    this.hideYes = true;
  }
  onYesClick(data?: any) {
    this._groupsListFiltersModalService.setCurrent(
      this.data
    );
    super.onYesClick(data);
  }
}
