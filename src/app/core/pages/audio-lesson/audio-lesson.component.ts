import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { AudioLesson } from '../../models/audio-lessons.model';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-lesson',
  templateUrl: './audio-lesson.component.html',
  styleUrls: ['./audio-lesson.component.scss']
})
export class AudioLessonComponent {
  private courseService = inject(CourseService);
  private location = inject(Location);
  audioLesson!: AudioLesson;
  audioLessonSubscription: Subscription | null = null;

  audio: any;

  formattedCurrentTime: string = '00:00';
  formattedDuration: string = '00:00';
  currentSliderValue: number = 0;
  duration: number = 0;
  pause: boolean = false;

  ngOnInit(): void {
    this.audioLessonSubscription = this.courseService.currentAudioLesson$.subscribe(audioLesson => {
      if (audioLesson) {
        this.audioLesson = audioLesson;
        this.initAudio();
      }
    })
  }

  initAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
    }
    this.audio = new Audio(this.audioLesson.audio);
    this.audio.play();
    this.audio.addEventListener('timeupdate', () => {
      this.currentSliderValue = this.audio.currentTime;
      this.formattedCurrentTime = this.formatTime(this.audio.currentTime);
    })
    this.audio.addEventListener('loadedmetadata', () => {
      this.formattedDuration = this.formatTime(this.audio.duration);
      this.duration = this.audio.duration;
    });
  }

  formatTime(timeInSeconds: number): string {
    const minutes: number = Math.floor(timeInSeconds / 60);
    const seconds: number = Math.floor(timeInSeconds % 60);
  
    // Форматируем в 'MM:SS', добавляя ноль перед секундами, если они меньше 10
    const formattedMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedSeconds: string = seconds < 10 ? '0' + seconds : seconds.toString();
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  formatLabel(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = Math.floor(value % 60);
  
    // Форматируем в 'MM:SS', добавляя ноль перед секундами, если они меньше 10
    const formattedMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedSeconds: string = seconds < 10 ? '0' + seconds : seconds.toString();
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  onSliderChange(): void {
    this.audio.currentTime = this.currentSliderValue;
    this.formattedCurrentTime = this.formatLabel(this.currentSliderValue);
  }
  handlePause(): void {
    if(!this.pause) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.pause = !this.pause;
  }
  handleMinusReplay() {
    this.audio.currentTime -= 15;
  }
  handlePlusReplay(): void {
    this.audio.currentTime += 15;
  }

  goBack(): void {
    this.audio.pause();
    this.location.back();
  }
  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
    if (this.audioLessonSubscription) {
      this.audioLessonSubscription.unsubscribe(); // Отписываемся от подписки
    }
  }
  
}
