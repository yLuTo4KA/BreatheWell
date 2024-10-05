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
  @Input() lessonLerned: boolean = false;
  @Input() readLessonTask: boolean = false;
  @Input() premium: boolean = false;
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
    if(this.readLessonTask) {
      return this.lessonLerned;
    }
    return this.completedTasks.includes(this.task.id);
  }

  moreInfo(): void {
    if(this.readLessonTask && this.lesson) {
      if(this.lesson.free || this.premium && !this.lesson.free) {
        this.courseService.getLesson(this.lesson.id).subscribe(response => {
          if(response) {
            this.router.navigate(['/lesson-preview']);
          }
        });
      } else {
        this.router.navigate(['/buying']);
      }
      return;
    }
    if(this.lesson && (this.lesson.free || (this.premium && !this.lesson.free))) {
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
    } else {
      this.router.navigate(['/buying']);
    }
  }

  emitCheckTask(): void {
    if(this.lesson && (this.lesson.free || (this.premium && !this.lesson.free))) {
      this.checkTask.emit(this.task.id);
    } else {
      this.router.navigate(['/buying']);
    }
      
  }

}
