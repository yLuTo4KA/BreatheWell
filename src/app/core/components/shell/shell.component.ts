import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TelegramService } from '../../services/telegram.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BreathService } from '../../services/breath.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  authService = inject(AuthService);
  breathService = inject(BreathService);

  tgService = inject(TelegramService);

  showFooter: boolean = true;

  authResponse: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.showFooter = currentUrl !== '/notAuth' && !currentUrl.startsWith('/start') && currentUrl !== '/breathing';
    });
    this.authService.deauth();
    this.authService.auth().subscribe(response => {
      this.authResponse = response;
      this.getSounds();
    });
    this.tgService.expand();
  }

  getSounds(): void {
    this.breathService.getSounds().subscribe(response => {
      this.getPractice();
    })
    
  }

  getPractice(): void {
    this.breathService.getPractice().subscribe(response => {
      this.redirectUser();
    })
  }

  redirectUser(): void {
    if (this.authResponse.newUser) {
      this.router.navigate(['/start']);
    } else {
      if (this.authResponse.user.premium) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/start/cta']);
      }
    }
  }


  ngOnDestroy(): void {
    this.authService.deauth();
  }

}
