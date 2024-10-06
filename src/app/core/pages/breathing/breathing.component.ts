import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreathService } from '../../services/breath.service';
import { ModalService } from '../../services/modal.service';
import { Breath } from '../../models/breath.model';
import { ModalsView } from '../../models/modals-view.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';import { initHapticFeedback } from '@telegram-apps/sdk';

const hapticFeedback = initHapticFeedback();

@Component({
  selector: 'app-breathing',
  templateUrl: './breathing.component.html',
  styleUrls: ['./breathing.component.scss']
})
export class BreathingComponent {
  private breathService = inject(BreathService);
  private modalService = inject(ModalService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private isDestroyed = false;

  breathProcess: "up" | "down" | "started" | "paused" = "started"; // состояния
  breathType: "nose" | "lips" = "nose";

  breathSetting: Breath = {
    id: 0,
    breathDuration: 3,
    exhaleDuration: 3,
    breathHold: 3,
    exhaleHold: 3,
    duration: 7 * 60,
    sound: null,
    breath_type: 'Nose',
    exhale_type: 'Mouth'
  }
  modal: ModalsView = {
    practiceSettings: false,
    soundSettings: false,
    durationSettings: false
  }
  confrimCloseModal = false;

  // backend data 

  currentSpeed: number = this.breathSetting.breathDuration; // Текущая скорость (вдох или выдох)
  currentDuration: number = this.breathSetting.duration;
  timer = 3; // таймер
  startTime = 3; // отсчет до начала после паузы

  paused = false; // пауза

  action: "Приготовьтесь!" | "Вдох" | "Выдох" | "Задержите дыхание" | "Пауза" = "Приготовьтесь!"; // действие

  userActiveToday: boolean = false;

  loading$ = new BehaviorSubject<boolean>(true); // загрузка

  private start$ = new BehaviorSubject<boolean>(false);

  private audio = new Audio();


  async ngOnInit() {
    this.isDestroyed = false;
    this.authService.user$.subscribe(response => {
      if (response) {
        this.userActiveToday = response.todayActive;
      }
    })
    this.modalService.modalsView$.subscribe(response => {
      this.modal = response;
    })
    this.breathService.breathSetting$.subscribe(response => {
      this.breathSetting = response;
      this.currentSpeed = response.breathDuration;
      this.currentDuration = response.duration;
    })
    this.loading$.subscribe(async (response) => {
      if (!response) {
        await this.pauseOff();
        this.start$.subscribe((response) => {
          this.startBreath();
        });
      }
    })
    await this.wait(1.5);
    this.loading$.next(false);
  }

  async wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  async startBreath() {
    if (!this.isDestroyed && !this.paused) this.playAuido(this.breathSetting.sound?.soundMedia.url ?? '');
    while (!this.paused) {
      if (this.isDestroyed) return;
      await this.up();
      if (this.paused) break;
      if (this.isDestroyed) return;
      await this.hold(this.breathSetting.breathHold);
      if (this.paused) break;
      if (this.isDestroyed) return;
      await this.down();
      if (this.isDestroyed) return;
      if (this.paused) break;
      await this.hold(this.breathSetting.exhaleHold);
    }
  }

  async up() {
    this.breathProcess = 'up';
    this.breathType = this.breathSetting.breath_type === "Nose" ? "nose" : "lips";
    this.currentSpeed = this.breathSetting.breathDuration;
    this.timer = this.breathSetting.breathDuration;
    this.action = "Вдох";
    hapticFeedback.impactOccurred('medium');
    await this.updateTimer(this.currentSpeed);
  }

  async down() {
    this.breathProcess = 'down';
    this.breathType = this.breathSetting.exhale_type === "Nose" ? "nose" : "lips";
    this.currentSpeed = this.breathSetting.exhaleDuration;
    this.timer = this.breathSetting.exhaleDuration;
    this.action = "Выдох";
    hapticFeedback.impactOccurred('medium');
    await this.updateTimer(this.currentSpeed);
  }

  async hold(duration: number) {
    if (duration > 0) {
      this.action = "Задержите дыхание";
      hapticFeedback.impactOccurred('medium');
      this.timer = duration;
      await this.updateTimer(duration);
    }
  }

  async updateTimer(duration: number) {
    for (let i = duration; i > 0; i--) {
      if (this.paused) return;
      this.timer = i;
      if (this.currentDuration > 0 && this.breathProcess == 'down' || this.breathProcess == 'up') this.currentDuration--;
      if (this.currentDuration <= 0) {
        this.pauseOn();
        this.openDayliProgress();
      }
      await this.wait(1);
    }
  }

  pauseOn(): void {
    if (this.breathProcess !== 'paused') {
      this.paused = true;
      this.action = "Пауза";
      this.breathProcess = "paused";
      this.stopAudio();
    }
  }

  async pauseOff() {
    if ((this.modal.practiceSettings && this.modal.durationSettings) || (this.modal.practiceSettings && this.modal.soundSettings)) return;
    this.paused = false;
    this.breathProcess = "started";
    this.action = "Приготовьтесь!";
    this.timer = 3;
    await this.updateTimer(this.timer);
    this.start$.next(true);
  }

  getTimer(timer: number): string {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  getProcessClass(): string {
    return `process-${this.breathProcess}`;
  }

  playAuido(audioSrc: string): void {
    this.audio.src = audioSrc;
    this.audio.load();
    this.audio.play();
    this.audio.onended = () => {
      this.audio.currentTime = 0;
      this.audio.play();
    };
  }

  stopAudio(): void {
    this.audio.pause();
  }

  openPracticeSettings(): void {
    this.modalService.openModal('practiceSettings');
    this.pauseOn();
  }
  closePracticeSettings(): void {
    this.modalService.closeModal('practiceSettings');
    this.pauseOff();
  }
  openSoundSettings(): void {
    this.modalService.openModal('soundSettings');
    this.pauseOn();
  }
  openDurationSettings(): void {
    this.modalService.openModal('durationSettings');
    this.pauseOn();
  }

  closeModal(): void {
    this.pauseOff();
  }

  openDayliProgress(): void {
    // if (!this.userActiveToday) {
      this.authService.dayliCheck().subscribe(response => {
        if (response.success) {
          this.authService.setUserData(response.user);
          this.router.navigate(['/dayli-progress']);
        } else {
          this.router.navigate(['/dayli-progress']); // del fo prod ** nav to home!!!
        }
      })
  
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }

  closePage(): void {
    this.pauseOn();
    this.confrimCloseModal = true;
  }
  returnPage(): void {
    this.pauseOff();
    this.confrimCloseModal = false;
  }

  ngOnDestroy(): void {
    this.stopAudio();
    this.isDestroyed = true;
  }

}


