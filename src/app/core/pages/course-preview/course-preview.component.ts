import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Progress } from '../../models/progress.model';
import { LessonsList } from '../../models/lesson.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.scss']
})
export class CoursePreviewComponent {
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private location = inject(Location);


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
        if(lesson.id === this.progress.todayLesson.id && this.progress.todayComplete) {
          return;
        }
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

  goBack(): void {
    this.location.back();
  }
  lastLesson(): number {
    return this.progress.todayLesson.id === this.lessonsList[this.lessonsList.length - 1].id ? this.progress.todayLesson.id : this.progress.todayLesson.id - 1;
  }
  getLessonStatus(lesson: LessonsList): {[key: string]: boolean} {
    if(lesson.id === this.progress.todayLesson.id && !this.progress.todayComplete) {
      return {'--current': true};
    }
    if(this.progress.completedLessons.includes(lesson.id)) {
      return {'--active': true};
    }
    return {'--closed': true};
  }
  navigateToLesson() {
    this.router.navigate(['/lesson-preview']);
  }
}
