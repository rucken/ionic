import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilePanelModule } from '@rucken/ionic';
import { ProfilePageComponent } from './profile-page.component';
import { PROFILE_PAGE_ROUTES } from './profile-page.routes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfilePanelModule,
    TranslateModule.forChild(),
    RouterModule.forChild(PROFILE_PAGE_ROUTES)
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule { }
