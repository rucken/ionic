import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { FormGroupModule } from '../../components/form-group/form-group.module';
import { PromptFormModalModule } from '../prompt-form-modal/prompt-form-modal.module';
import { EntityModalComponent } from './entity-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormGroupModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    PipesModule,
    PromptFormModalModule,
    NgxBindIOModule
  ],
  declarations: [EntityModalComponent],
  entryComponents: [EntityModalComponent],
  exports: [EntityModalComponent, FormGroupModule]
})
export class EntityModalModule { }
