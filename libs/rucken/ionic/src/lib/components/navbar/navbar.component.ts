import { ChangeDetectionStrategy, Component, EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input()
  showSignIn: boolean;
  @Input()
  showSignOut: boolean;
  @Input()
  title: string;
  @Input()
  set routes(routes: any[]) {
    this.allowedRoutes$.next(
      routes
        ? routes.filter((item: any) => item.data && item.data.visible !== false)
        : []
    );
    const allowedRoutes = this.allowedRoutes$.getValue().map((item: any) => {
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
    this.rightRoutes$.next(
      allowedRoutes.filter((item: any) => item.align === 'right')
    );
    this.leftRoutes$.next(
      allowedRoutes.filter((item: any) => item.align !== 'right')
    );
  }
  @Output()
  signIn = new EventEmitter();
  @Output()
  signOut = new EventEmitter();

  public allowedRoutes$ = new BehaviorSubject([]);
  public rightRoutes$ = new BehaviorSubject([]);
  public leftRoutes$ = new BehaviorSubject([]);

  constructor(public router: Router) { }
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
