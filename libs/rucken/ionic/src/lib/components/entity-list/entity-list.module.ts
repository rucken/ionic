import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { EntityModalModule } from '../entity-modal/entity-modal.module';
import { EntityListComponent } from './entity-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EntityModalModule,
    TranslateModule.forChild(),
    PipesModule,
    RouterModule
  ],
  declarations: [EntityListComponent],
  entryComponents: [EntityListComponent],
  exports: [EntityListComponent, FormsModule, ReactiveFormsModule, PipesModule]
})
export class EntityListModule { }
