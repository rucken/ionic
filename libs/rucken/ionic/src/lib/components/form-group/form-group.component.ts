import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements AfterViewInit {
  @Input()
  checkIsDirty?: boolean = undefined;
  @Input()
  tooltipPlacement?: string = undefined;

  get errors(): Observable<any> {
    if (this.form && (this.checkIsDirty !== true || this.form.dirty)) {
      return this.form.customValidateErrors.pipe(
        map(
          customValidateErrors =>
            customValidateErrors[this.name]
              ? (customValidateErrors[this.name] as string[])
              : []
        )
      );
    } else {
      return of([]);
    }
  }
  @Input()
  form: DynamicFormGroup<any> = undefined;
  @Input()
  set name(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @Input()
  title: string = undefined;

  get valid() {
    return !this.form || this.form.get(this.name).valid;
  }
  input: { focus: () => void };
  private _name: string;

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }
  ngAfterViewInit() {
    this.input = this._elementRef.nativeElement.querySelector('ion-item').querySelector('ion-input');
  }
}
