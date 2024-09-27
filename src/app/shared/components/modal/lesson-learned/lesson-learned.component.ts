import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-learned',
  templateUrl: './lesson-learned.component.html',
  styleUrls: ['./lesson-learned.component.scss']
})
export class LessonLearnedComponent {
  @Input() viewModal: boolean = false;
  @Output() closeModalEmit = new EventEmitter<void>();


  closeModal(): void {
    this.closeModalEmit.emit();
  }
}
