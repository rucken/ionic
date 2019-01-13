import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var require: any;
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styles: [':host form {height: 100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public readme = require('html-loader!markdown-loader!./../../../../../../README.md').replace(
    '<h1 id="rucken-ionic">rucken-ionic/h1>',
    ''
  );
  title$: Observable<string>;
  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    this.title$ = activatedRoute.data.pipe(
      map(data => data && data.meta && data.meta.title)
    );
  }
}
