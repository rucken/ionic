import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '@rucken/core';
import { SelectInputComponent } from './select-input.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    TranslateModule.forChild(),
  ],
  declarations: [SelectInputComponent],
  exports: [SelectInputComponent]
})
export class SelectInputModule { }
