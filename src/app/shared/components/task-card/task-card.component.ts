import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) img!: string;
  @Input({required: true}) id!: number;
  @Input({required: true}) completedTasks!: number[];
  @Output() checkTask = new EventEmitter<number>(); 
  @Output() moreInfo = new EventEmitter<number>();

  isComplete(): boolean {
    return this.completedTasks.includes(this.id);
  }

  emitMoreInfo(): void {
    this.moreInfo.emit(this.id);
  }

  emitCheckTask(): void {
    this.checkTask.emit(this.id);
  }

}
