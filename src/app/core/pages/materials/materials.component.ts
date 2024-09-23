import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Progress } from '../../models/progress.model';
import { LessonsList } from '../../models/lesson.model';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent {
  private courseService = inject(CourseService);

  progress!: Progress;
  lessonsList!: LessonsList[];

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
  }
}
