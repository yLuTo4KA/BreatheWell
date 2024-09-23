import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Lesson } from '../../models/lesson.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lesson-preview',
  templateUrl: './lesson-preview.component.html',
  styleUrls: ['./lesson-preview.component.scss']
})
export class LessonPreviewComponent {
  private courseService = inject(CourseService);
  private location = inject(Location);
  lesson!: Lesson;
  
  constructor(){}

  ngOnInit(): void {
    this.courseService.lesson$.subscribe(response => {
      if(response) {
        this.lesson = response;
      }
    })
  }
  goBack(): void {
    this.location.back();
  }

}
