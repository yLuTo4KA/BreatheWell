import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
  styleUrls: ['./feature-item.component.scss']
})
export class FeatureItemComponent {
  @Input({required: true}) icon!: string;
  @Input({required: true}) title!: string;
  @Input({required: true}) description!: string;
}
