import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Group, transformDateToString, transformStringToDate } from '@rucken/core';
import { Observable } from 'rxjs';
import { GroupsService } from '../../../services/groups.service';
import { CustomUser } from '../../../models/custom-user';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styles: [':host form {height: 100%;}'],
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
