import { Component, inject } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { tap } from 'rxjs';
import { initInvoice } from '@telegram-apps/sdk';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { LoadingService } from '../../services/loading.service';
import { Progress } from '../../models/progress.model';

@Component({
  selector: 'app-buy-premium',
  templateUrl: './buy-premium.component.html',
  styleUrls: ['./buy-premium.component.scss']
})
export class BuyPremiumComponent {
  private paymentService = inject(PaymentService);
  private authService = inject(AuthService);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  viewFirstLessonModal: boolean = false;

  timer: number = 30 * 60;
  private timerInterval: any;

  loading = false;
  loadingSub: any;

  newUser: boolean = false;
  lessonsCount = this.courseService.getLessonsCount();


  constructor() { }

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);

    this.loadingSub = this.paymentService.loading$.subscribe(response => {
      this.loading = response;
    })
    this.authService.newUser$.subscribe(data => this.newUser = data);
  }

  getTimer(timer: number) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? '0' : '' + minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getInvoice(): void {
    this.paymentService.getInvoice(19000, 'RUB').subscribe(response => {
      if (response && response.url) {
        const invoice = initInvoice();
        this.loadingService.startLoading();
        invoice.open(response.url, 'url').then((status) => {
          if (status === 'paid') {
            this.authService.getProfile().subscribe(response => {
              if (response) {
                this.closePage();
              }
            });

          }
        }).finally(() => {
          this.loadingService.stopLoading();
        })
      }
    })
  }

  closePage(): void {
    if(this.newUser) {
      this.viewFirstLessonModal = true;
    }else {
      this.router.navigate(['/home']);
    }
  }
  openFirstLesson(): void {
    this.courseService.getLesson(1).subscribe(response => {
      if (response) {
        this.router.navigate(['/lesson-preview']);
      }
    })
  }
  closeFirstLesson(): void {
    this.viewFirstLessonModal = false;
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.loadingService.stopLoading();
  }
}
