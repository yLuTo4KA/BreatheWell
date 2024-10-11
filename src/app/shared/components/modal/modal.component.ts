import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() viewModal: boolean = true;
  @Input() viewCloseButton: boolean = true;
  @Input() smallButton: boolean = false;
  @Output() closeModalEmit = new EventEmitter<void>();


  closeModal(): void {
    this.closeModalEmit.emit();
  }
}
