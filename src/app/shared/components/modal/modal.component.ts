import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() viewModal: boolean = true;
  @Input() viewCloseButton: boolean = true;
  @Output() closeModalEmit = new EventEmitter<void>();

  ngOnInit(): void {
    this.setContainerHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setContainerHeight();
  }

  private setContainerHeight(): void {
    const height = window.innerHeight;
    const container = document.querySelector('.modal') as HTMLElement;
    if (container) {
      container.style.height = `${height}px`; // Устанавливаем высоту контейнера
    }
  }
  closeModal(): void {
    this.closeModalEmit.emit();
  }
}
