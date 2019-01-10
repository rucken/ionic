import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
import { SelectInputModule } from '../../../components/select-input/select-input.module';
import { ProfilePanelComponent } from './profile-panel.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormGroupModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    DirectivesModule,
    PipesModule,
    SelectInputModule
  ],
  declarations: [ProfilePanelComponent],
  entryComponents: [ProfilePanelComponent],
  exports: [ProfilePanelComponent]
})
export class ProfilePanelModule { }
