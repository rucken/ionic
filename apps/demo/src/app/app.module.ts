import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { MetaLoader, MetaModule } from '@ngx-meta/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccountModule, AuthModalModule, AuthModule, BrowserStorage, CONTENT_TYPES_CONFIG_TOKEN, defaultContentTypesConfig, defaultGroupsConfig, defaultPermissionsConfig, defaultUsersConfig, ErrorsExtractor, GROUPS_CONFIG_TOKEN, LangModule, LangService, PermissionsGuard, PERMISSIONS_CONFIG_TOKEN, PipesModule, STORAGE_CONFIG_TOKEN, TokenService, TransferHttpCacheModule, USERS_CONFIG_TOKEN } from '@rucken/core';
import { GroupsListFiltersModalModule, GroupsListFiltersModalService, IonicAuthModalModule, IonicModalsModule, NavbarModule, UsersListFiltersModalModule, UsersListFiltersModalService } from '@rucken/ionic';
import { NgxBindIOModule } from 'ngx-bind-io';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxRepositoryModule } from 'ngx-repository';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AllRoutes, AppLangs, appMetaFactory, OauthModalProviders, OauthProviders } from './app.config';
import { initializeApp } from './utils/initialize-app';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    PipesModule,
    HttpClientModule,
    NgxRepositoryModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'demo' }),
    TransferHttpCacheModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    IonicModule.forRoot(),
    AuthModule.forRoot({
      apiUrl: environment.apiUrl,
      oauth: {
        providers: OauthProviders
      }
    }),
    AccountModule.forRoot({
      apiUrl: environment.apiUrl
    }),
    LangModule.forRoot({
      languages: AppLangs
    }),
    RouterModule.forRoot(AllRoutes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled'
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: appMetaFactory,
      deps: [TranslateService]
    }),
    AuthModalModule.forRoot({
      oauth: {
        providers: OauthModalProviders
      }
    }),
    IonicAuthModalModule,
    NavbarModule,
    IonicModalsModule,
    UsersListFiltersModalModule.forRoot(),
    GroupsListFiltersModalModule.forRoot(),
    NgxBindIOModule.forRoot()
  ],
  providers: [
    {
      provide: CONTENT_TYPES_CONFIG_TOKEN,
      useValue: {
        ...defaultContentTypesConfig,
        apiUrl: environment.apiUrl
      }
    },
    {
      provide: PERMISSIONS_CONFIG_TOKEN,
      useValue: {
        ...defaultPermissionsConfig,
        apiUrl: environment.apiUrl
      }
    },
    {
      provide: USERS_CONFIG_TOKEN,
      useValue: {
        ...defaultUsersConfig,
        apiUrl: environment.apiUrl
      }
    },
    {
      provide: GROUPS_CONFIG_TOKEN,
      useValue: {
        ...defaultGroupsConfig,
        apiUrl: environment.apiUrl
      }
    },
    { provide: STORAGE_CONFIG_TOKEN, useClass: BrowserStorage },
    { provide: 'ORIGIN_URL', useValue: location.origin },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [
        TokenService,
        LangService,
        UsersListFiltersModalService,
        GroupsListFiltersModalService
      ]
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CookieService,
    ErrorsExtractor,
    PermissionsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
