import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { CourseService } from '../../services/course.service';
import { Progress } from '../../models/progress.model';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.scss']
})
export class TodayTasksComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private courseService = inject(CourseService);
  private updateSubjet = new Subject<void>();
  private debounceTime = 1000;

  tasks: Task[] | null = null;
  userData!: User;
  lessonId!: number;
  progress!: Progress;

  taskLearn: Task = {
    id: 99999,
    title: 'Прочитать урок',
    description: '',
    preview_icon: '',
    task_image: ''
  };

  ngOnInit(): void {
    this.courseService.userProgress$.subscribe(response => {
      if (response && response.todayTasks) {
        this.progress = response;
        this.tasks = response.todayTasks;
      }
    })
    this.updateSubjet.pipe(debounceTime(this.debounceTime)).subscribe(() => {
      this.updateProgress();
    })
    this.authService.user$.subscribe(response => {
      if(response) {
        this.userData = response;
      }
    })
  }
  ngAfterViewInit(): void {
    if (this.lessonId === this.progress.todayLesson.id) {
      this.courseService.learnLesson(this.lessonId).subscribe();
    }

  }
  updateProgress(): void {
    const currentTasks = this.progress.todayTasks.map(task => task.id);
    this.courseService.updateTask(this.progress.completedTasks).subscribe(response => {
      this.progress = response;
      const completed = currentTasks.every(task => response.completedTasks.includes(task));
      if (completed) {
        if (this.userData.todayActive) {
          this.router.navigate(['task-complete']);
        } else {
          this.authService.dayliCheck().subscribe(response => {
            if (response.success) {
              this.router.navigate(['task-complete']);
            }
          })
        }   
      }
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
