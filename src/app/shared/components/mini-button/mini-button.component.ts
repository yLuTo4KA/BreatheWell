import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-button',
  templateUrl: './mini-button.component.html',
  styleUrls: ['./mini-button.component.scss']
})
export class MiniButtonComponent {
  @Input() icon: string = '';
  @Input() width: number = 44;
  @Input() height: number = 44;
  @Input() iconWidth: number = 24;
  @Input() iconHeight: number = 24;
  @Input() bgColor: string = '';
}
