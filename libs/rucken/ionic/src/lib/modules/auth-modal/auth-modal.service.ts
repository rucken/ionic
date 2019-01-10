import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthModalComponent, AuthModalService, AuthService, ErrorsExtractor, ModalsService, TokenService, translate, RedirectUrlDto } from '@rucken/core';
import { IonicModalsService } from '../modals/modals.service';
import { IonicAuthModalComponent } from './auth-modal.component';

@Injectable()
export class IonicAuthModalService extends AuthModalService {
  componentModal = IonicAuthModalComponent;
  signInInfoMessage: string;
  signUpInfoMessage: string;
  signInModalClass = 'primary';

  constructor(
    public authService: AuthService,
    public errorsExtractor: ErrorsExtractor,
    public tokenService: TokenService,
    public modalsService: ModalsService,
    public router: Router,
    @Inject(DOCUMENT) public document: any
  ) {
    super(authService, errorsExtractor, tokenService, modalsService);
  }
  onOauthSignInSuccess(modal: AuthModalComponent, data: RedirectUrlDto) {
    super.onOauthSignInSuccess(modal, data);
    this.document.location.href = data.redirect_uri;
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    super.onSignOutSuccess(modal);
    this.router.navigate(['home']);
  }
  async onSignOutAsync() {
    try {
      const result = await (this.modalsService as IonicModalsService).confirmAsync({
        title: translate('Sign out'),
        message: translate('Do you really want to leave?')
      });
      if (result) {
        this.authService.signOut().subscribe(data => this.onSignOutSuccess(undefined));
      }
    } catch (error) {
      throw error;
    }
  }
}
