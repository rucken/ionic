import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
import { PromptFormModalModule } from '../../../components/prompt-form-modal/prompt-form-modal.module';
import { SelectInputModule } from '../../../components/select-input/select-input.module';
import { UserModalComponent } from './user-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormGroupModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    DirectivesModule,
    PipesModule,
    PromptFormModalModule,
    SelectInputModule
  ],
  declarations: [UserModalComponent],
  entryComponents: [UserModalComponent],
  exports: [UserModalComponent, FormGroupModule]
})
export class UserModalModule { }
