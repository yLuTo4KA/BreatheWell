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
  viewConfrimModal: boolean = false;

  slide: number = 1;
  currentLesson = this.courseService.getCurrentLessonId();

  constructor() { }

  ngOnInit(): void {
    this.courseService.lesson$.subscribe(response => {
      if (response?.highlights && response.id === this.currentLesson) {
        this.highlights = response.highlights;
        this.courseService.learnLesson(response.id).subscribe();
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

  handleClick(event: MouseEvent): void {
    const x = event.clientX;
    const screenWidth = window.innerWidth;

    if (x >= screenWidth * 0.5) {
      console.log(this.highlights.length);
      console.log(this.slide);
      if (this.highlights.length > this.slide) {
        this.nextSlide();
      } else {
        this.router.navigate(['/home'])
      }
    } else {
      this.prevSlide();
    }
  }

}
