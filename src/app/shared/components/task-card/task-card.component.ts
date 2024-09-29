import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/core/models/lesson.model';
import { Task } from 'src/app/core/models/task.model';
import { BreathService } from 'src/app/core/services/breath.service';
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
  private breathService = inject(BreathService);

  private router = inject(Router);

  ngOnInit(): void {
    if (this.lesson) {
      this.courseService.setLesson(this.lesson);
    }
  }

  isComplete(): boolean {
    return this.completedTasks.includes(this.task.id);
  }

  moreInfo(): void {
    if (!this.task.audio_lesson && !this.task.practice) {
      this.courseService.setCurrentTask(this.task);
      this.router.navigate(['/task-detail']);
    }
    if(this.task.audio_lesson) {
      this.courseService.setCurrentAudioLesson(this.task.audio_lesson);
      this.router.navigate(['/audio-lesson']);
    }else if(this.task.practice) {
      console.log(this.task.practice)
      this.breathService.updatePractice(this.task.practice);
      this.router.navigate(['/breathing']);
    }
  }

  emitCheckTask(): void {
    this.checkTask.emit(this.task.id);
  }

}
