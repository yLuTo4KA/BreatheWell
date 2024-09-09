import { Component } from '@angular/core';

@Component({
  selector: 'app-breathing',
  templateUrl: './breathing.component.html',
  styleUrls: ['./breathing.component.scss']
})
export class BreathingComponent {
  breathingData: any | null = null;
  breathProcess: "up" | "down" | "pause" = "pause";
  breathSpeedUp = 5;
  breathSpeedDown = 4;
  breathSpeedPause = 3;
  currentSpeed: number = this.breathSpeedPause;
  paused = false;
  currentTimeout: any;

  ngOnInit() {
    this.startBreath();
  }

  startBreath(): void {
    this.up();
  }

  setBreathTimeout(callback: () => void, delay: number): void {
    if(this.paused) return;

    this.currentTimeout = setTimeout(() => {
      if(!this.paused) {
        callback();
      }
    }, delay * 1000)
  }

  up(): void {
    this.breathProcess = 'up';
    this.currentSpeed = this.breathSpeedUp;
    this.setBreathTimeout(() => {
      this.down();
    }, this.currentSpeed)
  }

  pause(): void {
    this.breathProcess = 'pause';
    this.currentSpeed = this.breathSpeedPause;
    this.setBreathTimeout(() => {
      this.down();
    }, this.currentSpeed)
  }

  down(): void {
    this.breathProcess = 'down';
    this.currentSpeed = this.breathSpeedDown;
    this.setBreathTimeout(() => {
      this.up();
    }, this.currentSpeed)
  }

  pauseOn(): void {
    this.paused = true;
    clearTimeout(this.currentTimeout);
  }
  resumeBreath(): void {
    this.paused = false;
    switch(this.breathProcess) {
      case 'up':
        this.up();
        break;
      case 'pause':
        this.pause();
        break;
      case 'down':
        this.down();
        break;
    }
  }



  getProcessClass(): string {
    return `process-${this.breathProcess}`
  }
}
