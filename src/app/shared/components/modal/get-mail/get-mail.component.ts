import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-get-mail',
  templateUrl: './get-mail.component.html',
  styleUrls: ['./get-mail.component.scss'],
})
export class GetMailComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() buyEvent = new EventEmitter<string>();
  @Input() viewModal: boolean = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  closeModal(): void {
    this.closeModalEvent.emit();
  }
  buy(): void {
    if(this.emailFormControl.valid) {
      this.buyEvent.emit(this.emailFormControl.value ?? '');
      this.closeModalEvent.emit();
    } else {
      this.emailFormControl.markAsTouched();
    }
  }

  scroll(): void {
    window.scroll(0, 0);
  }
}
