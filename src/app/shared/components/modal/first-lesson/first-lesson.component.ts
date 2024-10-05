import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-first-lesson',
  templateUrl: './first-lesson.component.html',
  styleUrls: ['./first-lesson.component.scss']
})
export class FirstLessonComponent {
  @Input() viewModal: boolean = false;
  @Output() closeModalEmit = new EventEmitter<void>();
  @Output() openFirstLessonEmit = new EventEmitter<void>();


  openFirstLesson(): void {
    this.openFirstLessonEmit.emit();
  }
  closeModal(): void {
    this.closeModalEmit.emit();
  }
}
