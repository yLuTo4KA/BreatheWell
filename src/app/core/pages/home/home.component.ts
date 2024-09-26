import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { BreathService } from '../../services/breath.service';
import { Practice } from '../../models/practice.model';
import { Breath } from '../../models/breath.model';
import { Router } from '@angular/router';
import { SuggestSettings } from '../../models/suggest-setting.model';
import { Progress } from '../../models/progress.model';
import { CourseService } from '../../services/course.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

export interface TimeOfDay {
  eng: "morning" | "day" | "night",
  ru: "Доброе утро" | "Добрый день" | "Доброй ночи"
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private breathService = inject(BreathService);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private updateSubjet = new Subject<void>();
  private debounceTime = 1000;
  viewHelpModal: boolean = false;

  private days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];

  timeOfDay: TimeOfDay = {
    eng: "morning",
    ru: "Доброе утро"
  }
  suggestSettings!: SuggestSettings;


  userData!: User;
  practiceData!: Practice[];
  breathSetting: Breath = {
    id: 0,
    breathDuration: 3,
    exhaleDuration: 3,
    breathHold: 3,
    exhaleHold: 3,
    duration: 7 * 60,
    sound: null
  }

  progressData!: Progress;

  currentOnline: number = Math.floor(Math.random() * (1200 - 600) + 600);
  onlineInterval: any;



  constructor() {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(response => {
      if (response) {
        this.userData = response;
      }
    })
    this.breathService.practices$.subscribe(response => {
      if (response) {
        this.practiceData = response;
      }
    })
    this.breathService.breathSetting$.subscribe(response => {
      if (response) {
        this.breathSetting = response;
      }
    })
    this.courseService.userProgress$.subscribe(response => {
      if (response) {
        this.progressData = response;
      }
    })
    this.updateSubjet.pipe(debounceTime(this.debounceTime)).subscribe(() => {
      this.updateProgress();
    })

    this.onlineInterval = setInterval(() => {
      this.getOnline();
    }, 1000 * 15)
    this.setTimeOfDay();
  }

  setTimeOfDay() {
    const hour = new Date().getHours();
    let title: string = 'morning';
    let subtitle: string | null = null;

    if (hour >= 5 && hour < 14) {
      this.timeOfDay = { eng: 'morning', ru: "Доброе утро" };
      title = 'Начинаем день продуктивно';
    } else if (hour >= 14 && hour < 19) {
      this.timeOfDay = { eng: 'day', ru: "Добрый день" };
      title = 'Снимаем стресс в конце дня';
    } else {
      this.timeOfDay = { eng: 'night', ru: "Доброй ночи" };
      title = 'Готовимся ко сну';
      subtitle = 'Дыхательные упражнения для крепкого сна';
    }

    this.suggestSettings = {
      timeOfDay: this.timeOfDay.eng,
      title,
      subtitle
    }
  }

  getOnline(): void {
    const randomOnline = Math.floor(Math.random() * (15 - 2) + 2);
    const randomOperator = Math.floor(Math.random() * (3 - 1) + 1);
    if (randomOperator === 2 || this.currentOnline >= 1200) {
      this.currentOnline -= randomOnline;
    } else {
      this.currentOnline += randomOnline;
    }
  }

  getDate(): any {
    const lastVisit = new Date(this.userData.lastVisit);
    const month = this.getMonth(lastVisit);
    const date = lastVisit.getDate();
    const day = lastVisit.getDay();

    return `${this.days[day]}, ${date} ${month}`
  }

  getMonth(date: Date): string {
    const monthsGenitive: any = {
      'январь': 'Января',
      'февраль': 'Февраля',
      'март': 'Марта',
      'апрель': 'Апреля',
      'май': 'Мая',
      'июнь': 'Июня',
      'июль': 'Июля',
      'август': 'Августа',
      'сентябрь': 'Сентября',
      'октябрь': 'Октября',
      'ноябрь': 'Ноября',
      'декабрь': 'Декабря'
    };
    const options = { month: 'long' } as Intl.DateTimeFormatOptions;
    let month = new Date(date).toLocaleDateString('ru-RU', options);
    month = month.charAt(0).toLowerCase() + month.slice(1);
    return monthsGenitive[month];
  }

  updateAndOpenPractice(practice: Practice): void {
    this.breathService.updatePractice(practice);
    this.router.navigate(['/breathing'])
  }

  checkTask(taskId: number): void {
    if (this.progressData.completedTasks.includes(taskId)) {
      this.progressData.completedTasks = this.progressData.completedTasks.filter(id => id !== taskId)
    } else {
      this.progressData.completedTasks.push(taskId);
    }

    // api 
    this.updateSubjet.next();
  }
  updateProgress(): void {
    const currentTasks = this.progressData.todayTasks.map(task => task.id);
    this.courseService.updateTask(this.progressData.completedTasks).subscribe(response => {
      this.progressData = response;
      const completed = currentTasks.every(task => response.completedTasks.includes(task));
      if (completed) {
        if (this.userData.todayActive) {
          this.router.navigate(['task-complete']);
        } else {
          this.authService.dayliCheck().subscribe(response => {
            if (response.success) {
              this.router.navigate(['task-complete']);
            }
          })
        }   
      }
    })
  }
  openLesson(id: number): void {
    if (id >= 2 && !this.userData.premium) {
      this.router.navigate(['/buying']);
    } else {
      this.courseService.getLesson(id).subscribe(response => {
        this.router.navigate(['/lesson-preview']);
      })
    }
  }

  toggleHelpModal(): void {
    this.viewHelpModal = !this.viewHelpModal;
  }

  ngOnDestroy(): void {
    clearInterval(this.onlineInterval);
  }
}
