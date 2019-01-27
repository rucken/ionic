import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityListModule } from '../../../components/entity-list/entity-list.module';
import { IonicModalsModule } from '../../../modules/modals/modals.module';
import { GroupModalModule } from '../group-modal/group-modal.module';
import { GroupsListFiltersModalModule } from './groups-list-filters-modal/groups-list-filters-modal.module';
import { GroupsListComponent } from './groups-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IonicModalsModule,
    TranslateModule.forChild(),
    EntityListModule,
    GroupModalModule,
    GroupsListFiltersModalModule,
    NgxBindIOModule
  ],
  declarations: [GroupsListComponent],
  exports: [GroupsListComponent]
})
export class GroupsListModule { }
