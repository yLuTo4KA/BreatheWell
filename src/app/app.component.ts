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
  }
}