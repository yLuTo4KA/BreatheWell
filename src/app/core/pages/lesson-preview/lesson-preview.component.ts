import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson-preview',
  templateUrl: './lesson-preview.component.html',
  styleUrls: ['./lesson-preview.component.scss']
})
export class LessonPreviewComponent {
  private courseService = inject(CourseService);
  lesson!: Lesson;
  
  constructor(){}

  ngOnInit(): void {
    this.courseService.lesson$.subscribe(response => {
      if(response) {
        this.lesson = response;
      }
    })
  }

}
