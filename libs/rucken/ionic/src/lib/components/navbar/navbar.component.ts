import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, isDevMode, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BindObservable } from 'bind-observable';
import { BindIoInner } from 'ngx-bind-io';
import { Observable } from 'rxjs';

@BindIoInner()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  @ContentChild('#defaultMenuItemTemplate')
  defaultMenuItemTemplate: TemplateRef<any>;
  @Input()
  menuItemTemplate: TemplateRef<any> = undefined;

  @Input()
  showSignIn: boolean = undefined;
  @Input()
  showSignOut: boolean = undefined;
  @Input()
  title: string = undefined;

  @Output()
  signIn = new EventEmitter();
  @Output()
  signOut = new EventEmitter();

  @BindObservable()
  @Input()
  allowedRoutes = [];
  allowedRoutes$: Observable<any[]>;

  @BindObservable()
  @Input()
  rightRoutes = [];
  rightRoutes$: Observable<any[]>;

  @BindObservable()
  @Input()
  leftRoutes = [];
  leftRoutes$: Observable<any[]>;

  constructor(public router: Router) { }
  setRoutes(routes: any[]) {
    this.allowedRoutes =
      routes
        ? routes.filter((item: any) => item.data && item.data.visible !== false)
        : [];
    const allowedRoutes = this.allowedRoutes.map((item: any) => {
      let newItem = item.data;
      if (newItem.meta) {
        newItem = { ...newItem, ...newItem.meta };
      }
      if (item.path) {
        newItem.path = item.path;
      }
      newItem.url = `/${newItem.path}`;
      newItem.redirectTo = item.redirectTo;
      return newItem;
    });
    this.rightRoutes =
      allowedRoutes.filter((item: any) => item.align === 'right');
    this.leftRoutes =
      allowedRoutes.filter((item: any) => item.align !== 'right');
  }
  onSignInClick(signInData?: any) {
    if (isDevMode() && this.signIn.observers.length === 0) {
      console.warn('No subscribers found for "signIn"', this);
    }
    this.signIn.emit(signInData);
  }
  onSignOutClick(signOutData?: any) {
    if (isDevMode() && this.signOut.observers.length === 0) {
      console.warn('No subscribers found for "signOut"', this);
    }
    this.signOut.emit(signOutData);
  }
}
