import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BasePromptModalComponent, CustomTranslatePipe, ModalsService } from '@rucken/core';
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
    private _tpranslateService: TranslateService,
    private _customTranslatePipe: CustomTranslatePipe
  ) {
    super();
  }
  onInfoClick(data?: any): void {
    const message = this._customTranslatePipe.transform(this.infoMessage, this.data);
    this._modalsService.info({ message });
  }
}
