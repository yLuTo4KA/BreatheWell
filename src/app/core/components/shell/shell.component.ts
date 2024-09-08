import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TelegramService } from '../../services/telegram.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('WelcomePage <=> WelcomeSliderPage', [
        style({ opacity: 0 }),       // Начальная прозрачность
        animate('500ms ease-in-out', style({ opacity: 1 })) // Плавное появление
      ])
    ])
  ]
})
export class ShellComponent implements OnInit {
  authService = inject(AuthService);
  tgService = inject(TelegramService);

  showFooter: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.showFooter = currentUrl !== '/notAuth' && !currentUrl.startsWith('/start');
    });
    this.authService.deauth();
    this.authService.auth().subscribe();
    this.tgService.expand();
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  ngOnDestroy(): void {
    this.authService.deauth();
  }

}
