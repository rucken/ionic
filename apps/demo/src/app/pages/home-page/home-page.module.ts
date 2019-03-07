import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { HomePageComponent } from './home-page.component';
import { HOME_PAGE_ROUTES } from './home-page.routes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(HOME_PAGE_ROUTES)
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
