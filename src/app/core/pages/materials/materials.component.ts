import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Progress } from '../../models/progress.model';
import { LessonsList } from '../../models/lesson.model';
import { AudioLesson } from '../../models/audio-lessons.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent {
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private router = inject(Router);

  progress!: Progress;
  user!: User;
  lessonsList!: LessonsList[];
  audioLessons!: AudioLesson[];

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
    this.courseService.audioLessonsList$.subscribe(response => {
      if (response) {
        this.audioLessons = response;
      }
    })
    this.authService.user$.subscribe(response => {
      if (response) {
        this.user = response;
      }
    })
  }

  isLocked(lesson: AudioLesson): boolean {
    if (!lesson.free && !this.user.premium) {
      return true;
    }
    return false;
  };

  openAudioLesson(lesson: AudioLesson): void {
    if (this.isLocked(lesson)) {
      this.router.navigate(['/buying']);
    } else {
      if (lesson.opens_with < this.progress.todayLesson.id) {
        this.courseService.setCurrentAudioLesson(lesson);
        this.router.navigate(['/audio-lesson']);
      }
    }
  }
}
