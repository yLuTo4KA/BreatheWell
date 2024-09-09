import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent {
  @ViewChild('headerContent', { read: ElementRef }) headerContent!: ElementRef;

  hasHeader: boolean = false;

  ngAfterContentInit() {
    this.hasHeader = this.headerContent.nativeElement.children.length > 0;
  }
}
