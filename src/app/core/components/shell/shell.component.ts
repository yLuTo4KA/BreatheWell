import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TelegramService } from '../../services/telegram.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
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
      this.showFooter = currentUrl !== '/notAuth' && !currentUrl.startsWith('/start') && currentUrl !== '/breathing';
    });
    this.authService.deauth();
    this.authService.auth().subscribe();
    this.tgService.expand();
  }
  ngOnDestroy(): void {
    this.authService.deauth();
  }

}
