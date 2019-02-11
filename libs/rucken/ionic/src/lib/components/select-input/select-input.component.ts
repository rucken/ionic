import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { translate } from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectInput } from './select-input';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styles: [':host {max-width: 100%;width: 100%;}'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInputComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent implements ControlValueAccessor, OnDestroy, OnInit {

  @Input()
  yesTitle = translate('Select');
  @Input()
  noTitle = translate('Cancel');
  @Input()
  multiple = false;
  @Input()
  titleField = 'title';
  @Input()
  @BindObservable()
  items: SelectInput[] = undefined;
  items$!: Observable<SelectInput[]>;
  @BindObservable()
  selectedIds: (string | number)[];
  selectedIds$!: Observable<(string | number)[]>;
  @BindObservable()
  disabled = false;
  disabled$!: Observable<boolean>;
  private _destroyed$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {
    this.subscribeToChanges();
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  subscribeToChanges() {
    this.selectedIds$.pipe(takeUntil(this._destroyed$)).subscribe(ids => {
      if (ids !== undefined && !Array.isArray(ids)) {
        ids = [ids];
      }
      const selectedItems = this.items.filter(item => ids.filter(id => item.id === id).length > 0);
      if (this.multiple) {
        this._onChange(selectedItems);
      } else {
        this._onChange(selectedItems.length ? selectedItems[0] : undefined);
      }
    });
  }
  writeValue(value: SelectInput[] | SelectInput): void {
    if (value && !Array.isArray(value)) {
      value = [value];
    }
    this.selectedIds = value ? (value as SelectInput[]).map(item => item.id) : [];
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  trackByFn(index: any, item: { id: any; }) {
    return item.id;
  }
  _onChange = (value: any) => { };
  _onTouched = () => { };
}
