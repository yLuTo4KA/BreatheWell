import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      'lungs',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/lungs.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'confusion',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/confusion.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'smile',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/smile.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'arrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrowUp.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/settings.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'forest',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/forest.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'arrowOpen',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrowOpen.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/close.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'lips',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/lips.svg")
    );
  }
}