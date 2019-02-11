import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AuthModalComponent, AUTH_MODAL_CONFIG_TOKEN, IAuthModalConfig } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';
import { PromptFormModalComponent } from '../../components/prompt-form-modal/prompt-form-modal.component';

@BindIoInner()
@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styles: [':host form {height: 100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicAuthModalComponent extends AuthModalComponent implements OnInit {
  @ViewChild('promptFormModal')
  promptFormModal: PromptFormModalComponent;
  @Input()
  class: string = undefined;
  constructor(
    @Inject(AUTH_MODAL_CONFIG_TOKEN) private _authModalConfig: IAuthModalConfig
  ) {
    super(_authModalConfig);
  }
}
