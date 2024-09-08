import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { SlideInfoComponent } from './pages/welcome-slider/components/slide-info/slide-info.component';
import { SlideSliderComponent } from './pages/welcome-slider/components/slide-slider/slide-slider.component';

import {register} from "swiper/element/bundle";
import { CtaComponent } from './pages/cta/cta.component';
register();


@NgModule({
  imports: [CommonModule,RouterModule,SharedModule, MatIconModule, TranslateModule],
  declarations: [ShellComponent, NotAuthComponent, FooterComponent, WelcomeComponent, WelcomeSliderComponent, SlideInfoComponent, SlideSliderComponent, CtaComponent],
  exports: [ShellComponent, NotAuthComponent, FooterComponent, WelcomeComponent, SlideInfoComponent,SlideSliderComponent, CtaComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {}
