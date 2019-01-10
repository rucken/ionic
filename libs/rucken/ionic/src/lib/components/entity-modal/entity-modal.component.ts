import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { BasePromptFormModalComponent } from '@rucken/core';

@Component({
  selector: 'entity-modal',
  templateUrl: './entity-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityModalComponent extends BasePromptFormModalComponent<any> {

  public ignoredFields = ['id'];
  public keys: string[] = [];

  set form(form: DynamicFormGroup<any>) {
    this.keys = form.controls
      ? Object.keys(form.controls).filter(key => this.ignoredFields.indexOf(key.toLowerCase()) === -1)
      : [];
    this._form = form;
  }
  get form() {
    return this._form;
  }

  private _form: DynamicFormGroup<any>;

  constructor() {
    super();
  }
}
