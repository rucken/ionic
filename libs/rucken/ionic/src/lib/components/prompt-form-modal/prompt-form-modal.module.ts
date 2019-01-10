import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroupModule } from '../form-group/form-group.module';
import { PromptFormModalComponent } from './prompt-form-modal.component';
import { PipesModule } from '@rucken/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    PipesModule,
    FormGroupModule,
    IonicModule
  ],
  declarations: [PromptFormModalComponent],
  entryComponents: [PromptFormModalComponent],
  exports: [PromptFormModalComponent, ReactiveFormsModule, FormsModule, PipesModule, FormGroupModule]
})
export class PromptFormModalModule { }
