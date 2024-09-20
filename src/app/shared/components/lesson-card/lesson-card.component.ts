import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) subtitle!: string;
  @Input({required: true}) img!: string;
  @Input() duration: number | null = null;
  @Input() border: boolean = false
}
