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

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.showFooter = currentUrl !== '/notAuth' && !currentUrl.startsWith('/start') && currentUrl !== '/breathing' && currentUrl !== '/buying';
      this.showPremium = currentUrl !== '/dayli-progress'
    });
    this.authService.deauth();
    this.authService.auth().subscribe(response => {
      this.authResponse = response;
      forkJoin({ sounds: this.breathService.getSounds(), practices: this.breathService.getPractice(), prices: this.pricesService.getPrices(), progress: this.courseService.getUserProgress(), lessonsList: this.courseService.getLessons()}).subscribe(() => {
        this.redirectUser();
      })
    });
    this.tgService.expand();
  }

  redirectUser(): void {
    this.router.navigate(['/start']);
    // if (this.authResponse.newUser) {  // later
    //   this.router.navigate(['/start']);
    // } else {
    //   if (this.authResponse.user.premium) {
    //     this.router.navigate(['/home']);
    //   } else {
    //     this.router.navigate(['/start/cta']);
    //   }
    // }
  }



  ngOnDestroy(): void {
    this.authService.deauth();
  }

}
