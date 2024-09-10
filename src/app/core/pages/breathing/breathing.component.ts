import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-breathing',
  templateUrl: './breathing.component.html',
  styleUrls: ['./breathing.component.scss']
})
export class BreathingComponent {
  breathingData: any | null = null;
  duration = 7;

  breathProcess: "up" | "down" | "started" = "started"; // состояния

  breathSpeedUp = 3; // длительность вдоха
  breathSpeedDown = 4; // выдоха
  currentSpeed: number = this.breathSpeedUp; // Текущая скорость (вдох или выдох)

  breathHold = 2; // задержка после вдоха
  exhaleHold = 5; // задержка после выдоха

  timer = 3; // таймер

  paused = false;
  action: string = "Приготовьтесь!";

  private start$ = new BehaviorSubject<boolean>(false);

  async ngOnInit() {
    await this.pauseOff();
    this.start$.subscribe((response) => {
      if (response) {
        this.startBreath();
      }
    });
  }

  async wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  async startBreath() {
    while (!this.paused) {
      await this.up();
      if (this.paused) break;
      await this.hold(this.breathHold);
      if (this.paused) break;
      await this.down();
      if (this.paused) break;
      await this.hold(this.exhaleHold);
    }
  }

  async up() {
    this.breathProcess = 'up';
    this.currentSpeed = this.breathSpeedUp;
    this.timer = this.breathSpeedUp;
    this.action = "Вдох";
    console.log('Вдох');
    await this.updateTimer(this.currentSpeed);
  }

  async down() {
    this.breathProcess = 'down';
    this.currentSpeed = this.breathSpeedDown;
    this.timer = this.breathSpeedDown;
    this.action = "Выдох";
    console.log('Выдох');
    await this.updateTimer(this.currentSpeed);
  }

  async hold(duration: number) {
    if (duration > 0) {
      this.action = "Задержите дыхание";
      this.timer = duration;
      await this.updateTimer(duration);
    }
  }

  async updateTimer(duration: number) {
    for (let i = duration; i > 0; i--) {
      if (this.paused) return;
      this.timer = i;
      await this.wait(1);
    }
  }

  pauseOn(): void {
    this.paused = true;
    this.action = "Пауза";
  }

  async pauseOff() {
    this.paused = false;

    await this.updateTimer(this.timer);
    this.start$.next(true);
  }

  getTimer(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getProcessClass(): string {
    return `process-${this.breathProcess}`;
  }
}
