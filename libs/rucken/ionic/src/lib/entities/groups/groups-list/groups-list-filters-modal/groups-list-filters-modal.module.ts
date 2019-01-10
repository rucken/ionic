import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { FormGroupModule } from '../../../../components/form-group/form-group.module';
import { PromptFormModalModule } from '../../../../components/prompt-form-modal/prompt-form-modal.module';
import { SelectInputModule } from '../../../../components/select-input/select-input.module';
import { GroupsListFiltersModalComponent } from './groups-list-filters-modal.component';
import { GroupsListFiltersModalService } from './groups-list-filters-modal.service';

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
  declarations: [GroupsListFiltersModalComponent],
  entryComponents: [GroupsListFiltersModalComponent],
  exports: [GroupsListFiltersModalComponent, FormGroupModule]
})
export class GroupsListFiltersModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsListFiltersModalModule,
      providers: [GroupsListFiltersModalService]
    };
  }
}
