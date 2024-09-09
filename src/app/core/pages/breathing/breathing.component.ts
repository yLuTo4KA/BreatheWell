import { Component } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

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

  breathHold = 2; // задержка после вдоха
  exhaleHold = 5; // после выдоха

  currentHold = this.breathHold;

  timer = 3; // таймер
  currentSpeed: number = this.breathSpeedUp; // текущая длительность вдоха/выдоха

  paused = false;
  currentTimeout: any;
  action: string = "Приготовьтесь!"

  private start$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    setInterval(() => {
      if (this.paused) return;
      this.timer--;
      if (this.timer <= 0) {
        switch (this.breathProcess) {
          case "up":
            this.timer = this.breathHold;
            if (this.breathHold > 0) {
              this.action = "Задержите дыхание"
            }

            break;
          case "down":
            this.timer = this.exhaleHold;
            if (this.exhaleHold > 0) {
              this.action = "Задержите дыхание"
            }
            break;
          case "started":
            if (!this.start$.value) {
              this.start$.next(true);
            }
            break;
        }
      }
    }, 1000)
    this.start$.subscribe((response) => {
      console.log(response);
      if (response) {
        this.startBreath();
      }
    })

  }

  startBreath(): void {
    this.up();
  }

  setBreathTimeout(callback: () => void, delay: number): void {
    if (this.paused) return;
    this.currentTimeout = setTimeout(() => {
      if (!this.paused) {
        callback();
      }
    }, (delay * 1000) + (this.currentHold * 1000))
  }

  up(): void {
    this.breathProcess = 'up';
    this.currentSpeed = this.breathSpeedUp;
    this.currentHold = this.breathHold;
    this.timer = this.breathSpeedUp;
    this.action = "Вдох"
    this.setBreathTimeout(() => {
      this.down();
    }, this.currentSpeed)
  }

  down(): void {
    this.breathProcess = 'down';
    this.currentSpeed = this.breathSpeedDown;
    this.currentHold = this.exhaleHold;
    this.timer = this.breathSpeedDown;
    this.action = "Выдох"
    this.setBreathTimeout(() => {
      this.up();
    }, this.currentSpeed)
  }

  pauseOn(): void {
    this.paused = true;
    this.timer = 0;
    clearTimeout(this.currentTimeout);
  }
  pauseOff(): void {
    switch (this.breathProcess) {
      case 'up':
        if (this.paused) {
          this.paused = false;
          this.down();
        }
        break;
      case 'down':
        if (this.paused) {
          this.paused = false;
          this.up();
        }
        break;
    }
    this.paused = false;
  }

  getTimer(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;

    const minutesDisplay = minutes
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutesDisplay}:${secondsDisplay}`;
  }


  getProcessClass(): string {
    return `process-${this.breathProcess}`
  }
}
