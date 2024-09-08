import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-info',
  templateUrl: './slide-info.component.html',
  styleUrls: ['./slide-info.component.scss']
})
export class SlideInfoComponent {
  @Input() iconName: string | null = null;
  @Input() title: string | null = null;
  @Input() stats: string | null = null;
  @Input() statsSub: string | null = null;
  @Input() text: string | null = null;
  @Input() color: string = 'purple';
}
