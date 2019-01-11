import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthModalComponent, AuthModalService, AuthService, ILanguagesItem, LangService, RedirectUrlDto, TokenService, User, UserTokenDto } from '@rucken/core';
import { GroupsService, PermissionsService } from '@rucken/ionic';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthModalSignInInfoMessage, AuthModalSignUpInfoMessage } from './app.config';
import { AppRoutes } from './app.routes';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  languages$: BehaviorSubject<ILanguagesItem[]>;
  currentLang$: BehaviorSubject<string>;

  public title: string;
  public routes = AppRoutes;
  public currentUser$: Observable<User>;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _alertController: AlertController,
    private _authModalService: AuthModalService,
    private _authService: AuthService,
    private _langService: LangService,
    private _platform: Platform,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _translateService: TranslateService,
    private _metaService: MetaService,
    private _tokenService: TokenService,
    private _groupsService: GroupsService,
    private _permissionsService: PermissionsService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this._authModalService.signInInfoMessage = AuthModalSignInInfoMessage;
    this._authModalService.signUpInfoMessage = AuthModalSignUpInfoMessage;
    this.languages$ = this._langService.languages$;
    this.currentLang$ = this._langService.current$;
    this.currentUser$ = this._authService.current$;

    this._platform.ready().then(() => {
      this.currentLang$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(lang => {
          this._metaService.setTag(
            'og:locale',
            lang.toLowerCase() + '-' + lang.toUpperCase()
          );
          this.title = this._translateService.instant(
            this._metaService.loader.settings.applicationName
          );
        });
      this.currentUser$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(user => {
          if (user) {
            if (user.permissionNames.includes('read_group')) {
              this._groupsService.repository.reloadAll();
            }
            if (user.permissionNames.includes('read_permission')) {
              this._permissionsService.repository.reloadAll();
            }
          }
        });
      if (isPlatformBrowser(this._platformId)) {
        this._tokenService.tokenHasExpired$.pipe(takeUntil(this._destroyed$)).subscribe(result => {
          if (result === true) {
            this.onInfo();
          }
        });
      }
      this._statusBar.styleDefault();
      this._splashScreen.hide();
    });
  }
  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.onInfo();
    }
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  onSwitchLang() {
    this.onSwitchLangAsync().then();
  }
  async onSwitchLangAsync() {
    const alert = await this._alertController.create({
      header: this._translateService.instant('Select language'),
      inputs: this.languages$.getValue().map(lang => (
        {
          name: 'lang',
          type: 'radio',
          label: this._translateService.instant(lang.title),
          value: lang.code,
          checked: this.currentLang$.getValue() === lang.code
        } as AlertInput
      )),
      buttons: [
        {
          text: this._translateService.instant('Cancel'),
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this._translateService.instant('Select'),
          handler: (value) => {
            this._langService.setCurrent(value);
          }
        }
      ]
    });
    await alert.present();
  }
  onInfo() {
    this._authModalService.onInfo();
  }
  onSignOut() {
    this._authModalService.onSignOut();
  }
  onSignIn() {
    this._authModalService.onSignIn();
  }
  onOauthSignInSuccess(modal: AuthModalComponent, data: RedirectUrlDto) {
    this._authModalService.onOauthSignInSuccess(modal, data);
  }
  onSignInOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
    this._authModalService.onSignInOrInfoSuccess(modal, data);
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    this._authModalService.onSignOutSuccess(modal);
  }
  onError(error: any) {
    this._authModalService.onError(error);
  }
  onSignInError(modal: AuthModalComponent, error: any) {
    this._authModalService.onSignInError(modal, error);
  }
}
