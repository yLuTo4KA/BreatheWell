import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';
import { Highlight } from '../../models/highlight.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Progress } from '../../models/progress.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private location = inject(Location);
  

  highlights!: Highlight[];
  lessonId!: number;
  currentLessonId!: number;
  viewConfrimModal: boolean = false;
  viewLearnLessonModal: boolean = false;

  progressData!: Progress;


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
    this.courseService.userProgress$.subscribe(response => {
      if(response ) {
        this.progressData = response;
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

  handleBack(event: MouseEvent): void {
    event.stopPropagation();
    this.location.back();
  }

  learnLesson(): void {
    if (this.lessonId === this.currentLessonId) {
      this.courseService.learnLesson(this.lessonId).subscribe((response) => {
        const currentTasks = this.progressData.todayTasks.map(task => task.id) ?? [];
        this.courseService.updateTask(this.progressData.completedTasks).subscribe(response => {
          this.progressData = response;
          const completed = currentTasks.every(task => response.completedTasks.includes(task));
          if (completed) {
              this.authService.dayliCheck().subscribe(response => {
                if (response.success) {
                  this.router.navigate(['task-complete']);
                }
              })
          }
        })
        this.viewLearnLessonModal = true;
      });
      
    } else {
      this.router.navigate(['/today-tasks']);
    }
  }
  closeLearnLessonModal(): void {
    this.viewLearnLessonModal = false;
    this.router.navigate(['/today-tasks']);
  }
  handleClick(event: MouseEvent): void {
    const x = event.clientX;
    const screenWidth = window.innerWidth;

    if (x >= screenWidth * 0.5) {
      if (this.highlights.length > this.slide) {
        this.nextSlide();
      } else {
        this.learnLesson();
      }
    } else {
      this.prevSlide();
    }
  }

}
