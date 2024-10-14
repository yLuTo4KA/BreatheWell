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

  isVisible: boolean = false;

  ngOnChanges() {
    if(this.viewModal) {
      this.isVisible = this.viewModal
    }
  }
  closeModal(): void {
    this.isVisible = false;
    setTimeout(() => {
      this.closeModalEmit.emit();
    }, 300)
  }
}
