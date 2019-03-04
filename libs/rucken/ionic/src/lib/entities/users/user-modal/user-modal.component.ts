import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Group } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../models/custom-user';
import { GroupsService } from '../../../services/groups.service';

@BindIoInner()
@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent extends BasePromptFormModalComponent<CustomUser> {
  @Input()
  class: string = undefined;
  groups$: Observable<Group[]>;

  constructor(
    private _groupsService: GroupsService
  ) {
    super();
    this.group(CustomUser);
    this.groups$ = this._groupsService.items$;
  }
}
