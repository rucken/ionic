import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { FormGroupModule } from '../../../../components/form-group/form-group.module';
import { PromptFormModalModule } from '../../../../components/prompt-form-modal/prompt-form-modal.module';
import { SelectInputModule } from '../../../../components/select-input/select-input.module';
import { UsersListFiltersModalComponent } from './users-list-filters-modal.component';
import { UsersListFiltersModalService } from './users-list-filters-modal.service';
import { NgxBindIOModule } from 'ngx-bind-io';

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
    SelectInputModule,
    NgxBindIOModule
  ],
  declarations: [UsersListFiltersModalComponent],
  entryComponents: [UsersListFiltersModalComponent],
  exports: [UsersListFiltersModalComponent, FormGroupModule]
})
export class UsersListFiltersModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersListFiltersModalModule,
      providers: [UsersListFiltersModalService]
    };
  }
}
