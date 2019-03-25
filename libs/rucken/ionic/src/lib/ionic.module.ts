import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LANGUAGES_ITEM_CONFIG_TOKEN, translate } from '@rucken/core';
import { RuI18n } from '../i18n/ru.i18n';
import { NavbarModule } from './components/navbar/navbar.module';
import { ENTITIES_PROVIDERS } from './config/providers';
import { IonicAuthModalModule } from './modules/auth-modal/auth-modal.module';
import { IonicModalsModule } from './modules/modals/modals.module';
import { SERVICES_PROVIDERS } from './services/providers';


@NgModule({
  imports: [
    CommonModule,
    IonicAuthModalModule,
    NavbarModule,
    IonicModalsModule
  ],
  exports: [
    IonicAuthModalModule,
    NavbarModule,
    IonicModalsModule
  ],
  providers: [
    {
      provide: LANGUAGES_ITEM_CONFIG_TOKEN,
      useValue: {
        title: translate('Russian'),
        code: 'ru',
        translations: [RuI18n]
      },
      multi: true
    },
    {
      provide: LANGUAGES_ITEM_CONFIG_TOKEN,
      useValue: {
        title: translate('English'),
        code: 'en',
        translations: []
      },
      multi: true
    },
    ...ENTITIES_PROVIDERS,
    ...SERVICES_PROVIDERS
  ]
})
export class RuckenIonicModule { }
