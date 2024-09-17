import { Component, Input } from '@angular/core';
import { SuggestSettings } from 'src/app/core/models/suggest-setting.model';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SugesstComponent {
  @Input({ required: true }) suggestSettings!: SuggestSettings;
} 
