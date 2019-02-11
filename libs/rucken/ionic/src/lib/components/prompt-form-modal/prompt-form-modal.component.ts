import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BasePromptModalComponent, ModalsService } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'prompt-form-modal',
  templateUrl: './prompt-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptFormModalComponent extends BasePromptModalComponent {
  @Input()
  hideHeader = false;
  @Input()
  hideFooter = false;
  @Input()
  class: string = undefined;
  @Input()
  hideTopNo = false;
  @Input()
  hideTopYes = false;
  @Input()
  iconTopNo = 'arrow-back';
  @Input()
  iconTopYes = 'checkmark';
  @Input()
  iconTopInfo = 'information-circle-outline';
  @Input()
  footerButtonsTemplate: TemplateRef<any> = undefined;
  @Input()
  readonlyFooterButtonsTemplate: TemplateRef<any> = undefined;
  @Input()
  headerTemplate: TemplateRef<any> = undefined;
  constructor(
    protected modalController: ModalController,
    private _modalsService: ModalsService,
    private _tpranslateService: TranslateService
  ) {
    super();
  }
  onInfoClick(data?: any): void {
    this._modalsService.info({ message: this._tpranslateService.instant(this.infoMessage) });
  }
}
