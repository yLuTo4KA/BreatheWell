import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';
import { Highlight } from '../../models/highlight.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);

  highlights!: Highlight[];
  lessonId!: number;
  currentLessonId!: number;
  viewConfrimModal: boolean = false;

  slide: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.courseService.lesson$.subscribe(response => {
      if (response?.highlights) {
        this.highlights = response.highlights;
        this.lessonId = response.id;
      }
    })
    this.courseService.userProgress$.subscribe(response => {
      if (response) {
        this.currentLessonId = response.todayLesson.id;
      }
    })

  }
  nextSlide(): void {
    this.slide++;
  }
  prevSlide(): void {
    if (this.slide >= 0) {
      this.slide--;
    }
  }
  setSlide(id: number): void {
    this.slide = id;
  }

  handleClosePage(event: MouseEvent): void {
    event.stopPropagation();
    this.viewConfrimModal = true;
  }

  learnLesson(): void {
    if (this.lessonId === this.currentLessonId) {
      this.courseService.learnLesson(this.lessonId).subscribe();
    }
  }
  handleClick(event: MouseEvent): void {
    const x = event.clientX;
    const screenWidth = window.innerWidth;

    if (x >= screenWidth * 0.5) {
      if (this.highlights.length > this.slide) {
        this.nextSlide();
      } else {
        this.learnLesson();
        this.router.navigate(['/today-tasks']);
      }
    } else {
      this.prevSlide();
    }
  }

}
