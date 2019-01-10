import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalsModule, ModalsService } from '@rucken/core';
import { IonicModalsService } from './modals.service';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    TranslateModule.forChild()
  ],
  providers: [IonicModalsService, { provide: ModalsService, useClass: IonicModalsService }],
  exports: [ModalsModule]
})
export class IonicModalsModule { }
