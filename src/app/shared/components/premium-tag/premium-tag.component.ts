import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-premium-tag',
  templateUrl: './premium-tag.component.html',
  styleUrls: ['./premium-tag.component.scss']
})
export class PremiumTagComponent {
  @Input() premium: boolean = false;

}
