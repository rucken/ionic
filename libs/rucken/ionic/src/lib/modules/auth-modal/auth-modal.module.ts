import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModalService } from '@rucken/core';
import { PromptFormModalModule } from '../../components/prompt-form-modal/prompt-form-modal.module';
import { IonicAuthModalComponent } from './auth-modal.component';
import { IonicAuthModalService } from './auth-modal.service';
import { IonicModule } from '@ionic/angular';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PromptFormModalModule,
    TranslateModule.forChild()
  ],
  declarations: [IonicAuthModalComponent],
  entryComponents: [IonicAuthModalComponent],
  exports: [IonicAuthModalComponent, PromptFormModalModule],
  providers: [IonicAuthModalService, { provide: AuthModalService, useClass: IonicAuthModalService }]
})
export class IonicAuthModalModule { }
