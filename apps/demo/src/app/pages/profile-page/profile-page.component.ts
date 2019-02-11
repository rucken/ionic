import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styles: [':host form {height: 100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  title$: Observable<string>;
  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    this.title$ = activatedRoute.data.pipe(
      map(data => data && data.meta && data.meta.title)
    );
  }
}
