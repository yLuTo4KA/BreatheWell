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
    this.setScreenHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setScreenHeight();
  }
  private setScreenHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  closeModal(): void {
    this.closeModalEmit.emit();
  }
}
