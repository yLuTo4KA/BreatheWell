import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-benefits-item',
  templateUrl: './benefits-item.component.html',
  styleUrls: ['./benefits-item.component.scss']
})
export class BenefitsItemComponent {
  @Input() icon!: string;
}
