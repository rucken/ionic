import { isPlatformServer } from '@angular/common';
import { EventEmitter, Inject, Injectable, PLATFORM_ID, TemplateRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, IModalRef, ModalsService } from '@rucken/core';

@Injectable()
export class IonicModalsService extends ModalsService {
  yesClass = 'primary';
  modalClass = '';

  private _onTopIsActive = false;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _translateService: TranslateService,
    private _errorsExtractor: ErrorsExtractor,
    private _modalController: ModalController,
    private _alertController: AlertController
  ) {
    super();
  }
  async createAsync<TComponent>(component: string | TemplateRef<TComponent>, options?: any): Promise<IModalRef<TComponent>> {
    if (options.class === undefined) {
      options.class = this.modalClass;
    }

    let bsModalRef: TComponent | HTMLIonModalElement | any;
    const instance = { ...options, yes: new EventEmitter(), no: new EventEmitter() };
    instance.yes.subscribe((modal: TComponent) => {
      this._onTopIsActive = false;
    });
    instance.no.subscribe((modal: TComponent) => {
      this._onTopIsActive = false;
    });
    instance.group = () => { };
    const modalRef: IModalRef<TComponent> = {
      instance: instance,
      hide: () => {
        this._modalController.dismiss();
      }
    };
    try {
      bsModalRef = await this._modalController.create({
        component: component as any,
        componentProps: {
          ...instance,
          ...instance.initialState,
          modalRef
        }
      });
      await bsModalRef.present();
    } catch (error) {
      throw error;
    }
    return modalRef;
  }
  async infoAsync(options: { message: string | any; title?: string; class?: string; onTop?: boolean }) {
    try {
      if (this._onTopIsActive) {
        return await Promise.resolve(undefined);
      }
    } catch (error) {
      throw error;
    }
    try {
      if (isPlatformServer(this._platformId)) {
        return await Promise.resolve(undefined);
      }
    } catch (error) {
      throw error;
    }
    const message = options.message;
    if (options.title === undefined) {
      options.title = 'Info';
    }
    try {
      return await new Promise(async resolve => {
        try {
          const alert = await this._alertController.create({
            cssClass: ['modal-info', options.class],
            keyboardClose: !(options.onTop === true),
            backdropDismiss: !(options.onTop === true),
            header: options.title ? this._translateService.instant(options.title) : '',
            message: message ? this._translateService.instant(message) : '',
            buttons: [
              {
                text: '',
                role: 'cancel',
                cssClass: this.noClass,
                handler: () => {
                  resolve(false);
                }
              }, {
                text: this._translateService.instant('OK'),
                cssClass: this.yesClass,
                handler: () => {
                  resolve(true);
                }
              }
            ]
          });
          await alert.present();
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  }
  async errorAsync(options: { error: string | any; title?: string; class?: string; onTop?: boolean }) {
    try {
      if (this._onTopIsActive) {
        return await Promise.resolve(undefined);
      }
    } catch (error) {
      throw error;
    }
    try {
      if (isPlatformServer(this._platformId)) {
        return await Promise.resolve(undefined);
      }
    } catch (error) {
      throw error;
    }
    const message = this._errorsExtractor.getErrorMessage(options.error);
    this.onErrorInConsole(options.error, message);
    if (options.title === undefined) {
      options.title = 'Error';
    }
    try {
      return await new Promise(async resolve => {
        try {
          const alert = await this._alertController.create({
            cssClass: ['modal-error', options.class],
            keyboardClose: !(options.onTop === true),
            backdropDismiss: !(options.onTop === true),
            header: options.title ? this._translateService.instant(options.title) : '',
            message: message ? this._translateService.instant(message) : '',
            buttons: [
              {
                text: '',
                role: 'cancel',
                cssClass: this.noClass,
                handler: () => {
                  resolve(false);
                }
              }, {
                text: this._translateService.instant('OK'),
                cssClass: this.yesClass,
                handler: () => {
                  resolve(true);
                }
              }
            ]
          });
          await alert.present();
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  }
  async confirmAsync(options: {
    message: string | any;
    title?: string;
    class?: string;
    onTop?: boolean,
    yesTitle?: string,
    noTitle?: string
  }) {
    try {
      if (isPlatformServer(this._platformId)) {
        return await Promise.resolve(undefined);
      }
    } catch (error) {
      throw error;
    }
    const message = options.message;
    if (options.title === undefined) {
      options.title = 'Prompt';
    }
    if (options.yesTitle === undefined) {
      options.yesTitle = 'Yes';
    }
    if (options.noTitle === undefined) {
      options.noTitle = 'No';
    }
    try {
      return await new Promise(async resolve => {
        try {
          const alert = await this._alertController.create({
            cssClass: ['modal-info', options.class],
            keyboardClose: !(options.onTop === true),
            backdropDismiss: !(options.onTop === true),
            header: options.title ? this._translateService.instant(options.title) : '',
            message: message ? this._translateService.instant(message) : '',
            buttons: [
              {
                text: options.noTitle ? this._translateService.instant(options.noTitle) : '',
                role: 'cancel',
                cssClass: this.noClass,
                handler: () => {
                  resolve(false);
                }
              }, {
                text: options.yesTitle ? this._translateService.instant(options.yesTitle) : '',
                cssClass: this.yesClass,
                handler: () => {
                  resolve(true);
                }
              }
            ]
          });
          await alert.present();
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  }
  private onErrorInConsole(error: any, message?: string): void {
    if (error && console && console.group && console.error) {
      console.group(this._translateService.instant('Error Log'));
      if (message) {
        console.error(message);
      }
      if (error) {
        console.error(error);
        if (error.stack) {
          console.error(error.stack);
        }
      }
      console.groupEnd();
    }
  }
}
