import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/core/models/lesson.model';
import { Task } from 'src/app/core/models/task.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) completedTasks!: number[];
  @Input() lesson: Lesson | null = null;
  @Output() checkTask = new EventEmitter<number>();

  private courseService = inject(CourseService);

  private router = inject(Router);

  ngOnInit(): void {
    if(this.lesson) {
      this.courseService.setLesson(this.lesson);
    }
  }

  isComplete(): boolean {
    return this.completedTasks.includes(this.task.id);
  }

  moreInfo(): void {
    this.courseService.setCurrentTask(this.task);
    this.router.navigate(['/task-detail']);
  }

  emitCheckTask(): void {
    this.checkTask.emit(this.task.id);
  }

}
