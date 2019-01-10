import { ChangeDetectionStrategy, Component, Input, isDevMode, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AccountService, AuthService, BasePromptPanelComponent, ErrorsExtractor, Group, ModalsService } from '@rucken/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomUser } from '../../../models/custom-user';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'profile-panel',
  templateUrl: './profile-panel.component.html',
  styles: [':host form {height: 100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePanelComponent extends BasePromptPanelComponent<CustomUser> implements OnDestroy {
  @Input()
  class: string;
  @Input()
  apiUrl?: string;
  @Input()
  enableSave = true;
  @Input()
  simpleMode = false;
  groups$: Observable<Group[]>;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _toastController: ToastController,
    private _errorsExtractor: ErrorsExtractor,
    private _authService: AuthService,
    private _accountService: AccountService,
    private _modalsService: ModalsService,
    private _groupsService: GroupsService,
    private _translateService: TranslateService
  ) {
    super();
    this.group(CustomUser);
    this.groups$ = this._groupsService.items$;
    this._authService.current$.pipe(takeUntil(this._destroyed$)).subscribe(user => {
      if (user) {
        this.data = user;
      }
    });
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  async showSaveToastAsync() {
    try {
      const toast = await this._toastController.create({
        message: this._translateService.instant('Profile updated'),
        duration: 1500
      });
      toast.present();
      return Promise.resolve(undefined);
    } catch (error) {
      throw error;
    }
  }
  onSaveClick(saveData?: any) {
    this.processing = true;
    this._accountService
      .update(this.data)
      .subscribe(data => this.onSave(data.user, saveData), error => this.onSaveError(error));
  }
  onSave(user: CustomUser, saveData?: any) {
    this.processing = false;
    console.log(this._translateService);
    this.form.clearExternalErrorsAsync().then(() =>
      this.showSaveToastAsync().then(() => {
        this.data = user;
        this._authService.setCurrent(user);
      })
    );
  }
  onError(error: any) {
    this._modalsService.error({
      error: error
    });
  }
  onSaveError(error: any) {
    this.processing = false;
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    if (this._errorsExtractor) {
      const externalErrors = this._errorsExtractor.getValidationErrors(error);
      this.form.setExternalErrorsAsync(externalErrors).then(() => {
        if (!externalErrors) {
          this.onError(error);
        }
      });
    }
  }
}
