import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { SelectInputComponent } from './select-input.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    TranslateModule.forChild(),
  ],
  declarations: [SelectInputComponent],
  exports: [SelectInputComponent]
})
export class SelectInputModule { }
