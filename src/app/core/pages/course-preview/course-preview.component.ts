import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Progress } from '../../models/progress.model';
import { LessonsList } from '../../models/lesson.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.scss']
})
export class CoursePreviewComponent {
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private router = inject(Router);


  progress!: Progress;
  lessonsList!: LessonsList[];
  userData!: User;

  constructor() { }

  ngOnInit(): void {
    this.courseService.userProgress$.subscribe(response => {
      if (response) {
        this.progress = response;
      }
    })
    this.courseService.lessonsList$.subscribe(response => {
      if (response) {
        this.lessonsList = response;
      }
    })
    this.authService.user$.subscribe(response => {
      if (response) {
        this.userData = response;
      }
    })
  }

  openLesson(lesson: LessonsList): void {
    if (lesson.id <= this.progress.todayLesson.id) {
      if (!lesson.free && this.userData.premium) {
        this.courseService.getLesson(lesson.id).subscribe(response => {
          if (response) {
            this.navigateToLesson();
          }
        })
      } else if (lesson.free) {
        this.courseService.getLesson(lesson.id).subscribe(response => {
          if (response) {
            this.navigateToLesson();
          }
        })
      } else {
        this.router.navigate(['/buying'])
      }
    }
  }
  navigateToLesson() {
    this.router.navigate(['/lesson-preview']);
  }
}
