import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityListModule } from '../../../components/entity-list/entity-list.module';
import { IonicModalsModule } from '../../../modules/modals/modals.module';
import { UserModalModule } from '../user-modal/user-modal.module';
import { UsersListFiltersModalModule } from './users-list-filters-modal/users-list-filters-modal.module';
import { UsersListComponent } from './users-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IonicModalsModule,
    TranslateModule.forChild(),
    EntityListModule,
    UserModalModule,
    UsersListFiltersModalModule,
    NgxBindIOModule
  ],
  declarations: [UsersListComponent],
  exports: [UsersListComponent]
})
export class UsersListModule { }
