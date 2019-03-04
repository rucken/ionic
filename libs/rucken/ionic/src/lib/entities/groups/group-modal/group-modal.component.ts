import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Group, Permission } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';
import { Observable } from 'rxjs';
import { PermissionsService } from '../../../services/permissions.service';

@BindIoInner()
@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupModalComponent extends BasePromptFormModalComponent<Group> {
  @Input()
  class: string = undefined;
  permissions$: Observable<Permission[]>;

  constructor(
    private _permissionsService: PermissionsService
  ) {
    super();
    this.group(Group);
    this.permissions$ = this._permissionsService.items$;
  }
}
