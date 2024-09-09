import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),       // Начальная прозрачность
        animate('500ms ease-in-out', style({ opacity: 1 })) // Плавное появление
      ])
    ])
  ]
})
export class StartPageComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
