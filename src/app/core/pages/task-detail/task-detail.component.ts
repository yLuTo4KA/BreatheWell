import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { CourseService } from '../../services/course.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Progress } from '../../models/progress.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  private courseService = inject(CourseService);

  private taskSub: Subscription | null = null;
  private progressSub: Subscription | null = null;
  task!: Task;
  progress!: Progress;
  private updateSubjet = new Subject<void>();
  private debounceTime = 1000;


  ngOnInit(): void {
    this.taskSub = this.courseService.currentTask$.subscribe(task => {
      if(task) {
        this.task = task;
      }
    })
    this.progressSub = this.courseService.userProgress$.subscribe(progress => {
      if (progress) {
        this.progress = progress;
      }
    })
    this.updateSubjet.pipe(debounceTime(this.debounceTime)).subscribe(() => {
      this.updateProgress();
    })
  }

  updateProgress(): void {
    this.courseService.updateTask(this.progress.completedTasks).subscribe(response => {
      this.progress = response;
    })
  }
  checkTask(taskId: number): void {
    if (this.progress.completedTasks.includes(taskId)) {
      this.progress.completedTasks = this.progress.completedTasks.filter(id => id !== taskId)
    } else {
      this.progress.completedTasks.push(taskId);
    }
    this.updateSubjet.next();
  }

  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
    if (this.progressSub) {
      this.progressSub.unsubscribe();
    }
  }

}
