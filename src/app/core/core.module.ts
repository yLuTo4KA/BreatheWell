import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShellComponent } from './components/shell/shell.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WelcomeSliderComponent } from './pages/welcome-slider/welcome-slider.component';



@NgModule({
  imports: [CommonModule,RouterModule,SharedModule, MatIconModule, TranslateModule],
  declarations: [ShellComponent, NotAuthComponent, FooterComponent, WelcomeComponent, WelcomeSliderComponent],
  exports: [ShellComponent, NotAuthComponent, FooterComponent, WelcomeComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
