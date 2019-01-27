import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModalService } from '@rucken/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { PromptFormModalModule } from '../../components/prompt-form-modal/prompt-form-modal.module';
import { IonicAuthModalComponent } from './auth-modal.component';
import { IonicAuthModalService } from './auth-modal.service';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PromptFormModalModule,
    TranslateModule.forChild(),
    NgxBindIOModule
  ],
  declarations: [IonicAuthModalComponent],
  entryComponents: [IonicAuthModalComponent],
  exports: [IonicAuthModalComponent, PromptFormModalModule],
  providers: [IonicAuthModalService, { provide: AuthModalService, useClass: IonicAuthModalService }]
})
export class IonicAuthModalModule { }
