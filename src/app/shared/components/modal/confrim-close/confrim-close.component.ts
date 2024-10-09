import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confrim-close',
  templateUrl: './confrim-close.component.html',
  styleUrls: ['./confrim-close.component.scss']
})
export class ConfrimCloseComponent {
  private router = inject(Router);
  @Input() viewModal: boolean = true;
  @Input() afterBreath: boolean = false;
  @Output() closeModalEmit = new EventEmitter<void>();
  @Output() nextOpenEmit = new EventEmitter<void>();


  closeModal(): void {
    this.closeModalEmit.emit();
  }

  confrim(): void {
    this.closeModalEmit.emit();
    if (this.afterBreath) {
      this.nextOpenEmit.emit();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
