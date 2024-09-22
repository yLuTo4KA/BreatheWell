import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';
import { Highlight } from '../../models/highlight.model';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent {
  private courseService = inject(CourseService);

  highlights!: Highlight[];

  slide: number = 1;

  constructor(){}

  ngOnInit(): void {
    this.courseService.lesson$.subscribe(response => {
      if(response?.highlights) {
        this.highlights = response.highlights;
      }
    })
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  nextSlide(): void {
    this.slide++;
  }
  setSlide(id: number): void {
    this.slide = id;
  }
}
