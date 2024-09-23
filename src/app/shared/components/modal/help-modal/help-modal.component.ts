import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() viewModal: boolean = false;


  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
