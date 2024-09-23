import { Component, inject } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {
  private courseService = inject(CourseService);
  lesson!: Lesson;
  private subscription!: Subscription;

  confrimCloseModal = false;
  showAllSources: boolean = false;

  ngOnInit(): void {
    this.subscription = this.courseService.lesson$.subscribe(response => {
      if(response) {
        this.lesson = response;
      }
    })
  }

  

  toggleShowSource(): void {
    this.showAllSources = !this.showAllSources;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
