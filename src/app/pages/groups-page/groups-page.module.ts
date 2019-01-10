import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GroupsListModule } from '@rucken/ionic';
import { GroupsPageComponent } from './groups-page.component';
import { GroupsPageRoutes } from './groups-page.routes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GroupsListModule,
    TranslateModule.forChild(),
    RouterModule.forChild(GroupsPageRoutes)
  ],
  declarations: [GroupsPageComponent]
})
export class GroupsPageModule { }
