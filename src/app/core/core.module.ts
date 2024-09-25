import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

import { NotAuthComponent } from './components/not-auth/not-auth.component';

import { FooterComponent } from './components/footer/footer.component';
import { ShellComponent } from './components/shell/shell.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeComponent } from './pages/start-page/children/welcome/welcome.component';
import { WelcomeSliderComponent } from './pages/start-page/children/welcome-slider/welcome-slider.component';
import { SlideInfoComponent } from './pages/start-page/children/welcome-slider/components/slide-info/slide-info.component';
import { SlideSliderComponent } from './pages/start-page/children/welcome-slider/components/slide-slider/slide-slider.component';

import {register} from "swiper/element/bundle";
import { CtaComponent } from './pages/start-page/children/cta/cta.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { HomeComponent } from './pages/home/home.component';
import { BreathingComponent } from './pages/breathing/breathing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DayliProgressComponent } from './pages/dayli-progress/dayli-progress.component';
import { BuyPremiumComponent } from './pages/buy-premium/buy-premium.component';
import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { LessonPreviewComponent } from './pages/lesson-preview/lesson-preview.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TodayTasksComponent } from './pages/today-tasks/today-tasks.component';
import { HighlightsComponent } from './pages/highlights/highlights.component';
import { AudioLessonComponent } from './pages/audio-lesson/audio-lesson.component';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
register();


@NgModule({
  imports: [CommonModule,RouterModule,SharedModule, MatIconModule, TranslateModule, BrowserAnimationsModule, MarkdownModule.forRoot(), MatSliderModule, FormsModule],
  declarations: [ShellComponent, NotAuthComponent, FooterComponent, WelcomeComponent, WelcomeSliderComponent, SlideInfoComponent, SlideSliderComponent, CtaComponent, StartPageComponent, HomeComponent, BreathingComponent, DayliProgressComponent, BuyPremiumComponent, CoursePreviewComponent, LessonComponent, MaterialsComponent, LessonPreviewComponent, TaskDetailComponent, TodayTasksComponent, HighlightsComponent, AudioLessonComponent],
  exports: [ShellComponent, NotAuthComponent, FooterComponent, WelcomeComponent, SlideInfoComponent,SlideSliderComponent, CtaComponent, StartPageComponent, HomeComponent, BreathingComponent, BuyPremiumComponent, CoursePreviewComponent, LessonComponent, MaterialsComponent, LessonPreviewComponent, TaskDetailComponent, TodayTasksComponent, HighlightsComponent],
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
