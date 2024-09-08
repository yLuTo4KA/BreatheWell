import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() tagName: string | null = null;
  @Input() fontSize: number = 12;
  @Input() height: number = 20;
  @Input() paddingX: number = 8;
}
