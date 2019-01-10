import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroupComponent } from './form-group.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  declarations: [FormGroupComponent],
  exports: [FormGroupComponent]
})
export class FormGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormGroupModule,
      providers: []
    };
  }
}
