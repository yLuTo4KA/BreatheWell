import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TelegramService } from 'src/app/core/services/telegram.service';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() viewModal: boolean = false;

  private tgService = inject(TelegramService);


  closeModal(): void {
    this.closeModalEvent.emit();
  }

  openTgLink(link: string, instantView: boolean = true) {
    this.tgService.openTgLink(link, instantView);
  }
  openTelegramLink(link: string) {
    this.tgService.openTelegramLink(link);
  }
}
