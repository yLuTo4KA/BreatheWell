import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() small: boolean = false;
  @Input() paddingX: number = 5;
  @Input() paddingY: number = 14;
  @Input() disabled: boolean = false;

  
}
