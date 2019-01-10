import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavbarComponent } from './navbar.component';
import { PipesModule } from '@rucken/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    NgxPermissionsModule,
    RouterModule,
    PipesModule
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    PipesModule
  ]
})
export class NavbarModule { }
