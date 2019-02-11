import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { BindIoInner } from 'ngx-bind-io';
import { DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@BindIoInner()
@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements AfterViewInit, OnChanges {
  @Input()
  checkIsDirty?: boolean = undefined;
  @Input()
  tooltipPlacement?: string = undefined;

  @Input()
  form: DynamicFormGroup<any> = undefined;
  @Input()
  name: string = undefined;
  @Input()
  title: string = undefined;

  input: { focus: () => void };
  errors$: Observable<any>;

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }
  ngAfterViewInit() {
    this.input = this._elementRef.nativeElement.querySelector('ion-item').querySelector('ion-input');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.form && changes.form.currentValue) {
      this.errors$ = changes.form.currentValue.customValidateErrors.pipe(
        map(customValidateErrors =>
          (
            (this.checkIsDirty !== true || changes.form.currentValue.dirty) &&
            customValidateErrors[this.name]
          ) ? (customValidateErrors[this.name] as string[]) : []
        )
      );
    }
  }

  getValid() {
    return !this.form || this.form.get(this.name).valid;
  }
}
