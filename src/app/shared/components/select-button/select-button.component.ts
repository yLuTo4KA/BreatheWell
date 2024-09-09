import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss']
})
export class SelectButtonComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() arrow: boolean = true;
}
