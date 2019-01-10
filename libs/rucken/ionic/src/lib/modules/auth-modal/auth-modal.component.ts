import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthModalComponent, AUTH_MODAL_CONFIG_TOKEN, IAuthModalConfig } from '@rucken/core';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styles: [':host form {height: 100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicAuthModalComponent extends AuthModalComponent {
  constructor(@Inject(AUTH_MODAL_CONFIG_TOKEN) private _authModalConfig: IAuthModalConfig) {
    super(_authModalConfig);
  }
}
