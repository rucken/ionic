import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilePanelModule } from '@rucken/ionic';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageRoutes } from './profile-page.routes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfilePanelModule,
    TranslateModule.forChild(),
    RouterModule.forChild(ProfilePageRoutes)
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule { }
