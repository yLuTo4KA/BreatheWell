import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TelegramService } from '../../services/telegram.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, forkJoin } from 'rxjs';
import { BreathService } from '../../services/breath.service';
import { PriceService } from '../../services/price.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  authService = inject(AuthService);
  breathService = inject(BreathService);
  pricesService = inject(PriceService);
  courseService = inject(CourseService);

  tgService = inject(TelegramService);

  showFooter: boolean = true;
  showPremium: boolean = true;

  authResponse: any;

  lessonsCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.showFooter = currentUrl !== '/notAuth' && !currentUrl.startsWith('/start') && currentUrl !== '/breathing' && currentUrl !== '/buying' && currentUrl !== '/audio-lesson';
      this.showPremium = currentUrl !== '/dayli-progress' && this.authResponse && !this.authResponse.user.premium
    });
    this.authService.deauth();
    this.authService.auth().subscribe(response => {
      this.authResponse = response;
      this.showPremium = !response.user.premium;
      const root = document.documentElement;
      root.style.setProperty('--dynamic-size', response.user.premium ? '110px' : '180px');
      forkJoin({ sounds: this.breathService.getSounds(), practices: this.breathService.getPractice(), prices: this.pricesService.getPrices(), progress: this.courseService.getUserProgress(), lessonsList: this.courseService.getLessons(), audioLessons: this.courseService.getAudioLessons() }).subscribe(() => {
        this.lessonsCount = this.courseService.getLessonsCount();
        this.redirectUser();
      })
    });
    this.authService.user$.subscribe(response => {
      if (response) {
        if (this.authResponse && this.authResponse.user) {
          this.authResponse.user = response;
          this.showPremium = !response.premium;
          const root = document.documentElement;
          root.style.setProperty('--dynamic-size', response.premium ? '110px' : '180px');
        }
      }
    })
    this.tgService.expand();
  }

  redirectUser(): void {
    const lesson = localStorage.getItem("lesson");
    if(lesson) {
      localStorage.removeItem("lesson");
      this.courseService.getLesson(+lesson).subscribe(response => {
        if(response) {
          this.router.navigate(['/lesson-preview']);
        }
      });
      return;
    }
    if (this.authResponse.newUser) {  // later
      this.router.navigate(['/start']);
    } else {
      if (this.authResponse.user.premium) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/start/cta']);
      }
    }
  }



  ngOnDestroy(): void {
    this.authService.deauth();
  }

}
