import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { CourseService } from '../../services/course.service';
import { Progress } from '../../models/progress.model';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.scss']
})
export class TodayTasksComponent {
  private courseService = inject(CourseService);
  private updateSubjet = new Subject<void>();
  private debounceTime = 1000;
  private subscription!: Subscription;

  tasks: Task[] | null = null;
  lessonId!: number;
  progress!: Progress;

  ngOnInit(): void {
    this.courseService.lesson$.subscribe(response => {
      if (response && response.tasks) {
        this.tasks = response.tasks;
        this.lessonId = response.id;
      }
    })
    this.courseService.userProgress$.subscribe(response => {
      if (response) {
        this.progress = response;
      }
    })
    this.updateSubjet.pipe(debounceTime(this.debounceTime)).subscribe(() => {
      this.updateProgress();
    })
  }
  ngAfterViewInit(): void {
    if (this.lessonId === this.progress.todayLesson.id) {
      this.courseService.learnLesson(this.lessonId).subscribe();
    }

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

}
