import { Attribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent {
  @Input() shadow: boolean = false;
  @Input() border: boolean = true;
  @Input() borderItem: boolean = false;
  @Input() radius: number = 12;
  @Input() active: boolean = false;
  @Input() bg: boolean = false;
  @Input() padding: number = 16;
}
