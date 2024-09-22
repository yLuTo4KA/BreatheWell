import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthComponent } from './core/components/not-auth/not-auth.component';
import { WelcomeComponent } from './core/pages/start-page/children/welcome/welcome.component';
import { WelcomeSliderComponent } from './core/pages/start-page/children/welcome-slider/welcome-slider.component';
import { CtaComponent } from './core/pages/start-page/children/cta/cta.component';
import { StartPageComponent } from './core/pages/start-page/start-page.component';
import { BreathingComponent } from './core/pages/breathing/breathing.component';
import { HomeComponent } from './core/pages/home/home.component';
import { DayliProgressComponent } from './core/pages/dayli-progress/dayli-progress.component';
import { BuyPremiumComponent } from './core/pages/buy-premium/buy-premium.component';
import { NotPremiumGuard } from './guards/not-premium.guard';
import { MaterialsComponent } from './core/pages/materials/materials.component';
import { CoursePreviewComponent } from './core/pages/course-preview/course-preview.component';
import { LessonComponent } from './core/pages/lesson/lesson.component';
import { LessonPreviewComponent } from './core/pages/lesson-preview/lesson-preview.component';
import { HighlightsComponent } from './core/pages/highlights/highlights.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'notAuth',
    component: NotAuthComponent,
  },
  {
    path: 'start',
    component: StartPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/start/welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'welcome-slider',
        component: WelcomeSliderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cta',
        component: CtaComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'breathing',
    component: BreathingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dayli-progress',
    component: DayliProgressComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buying',
    component: BuyPremiumComponent,
    canActivate: [AuthGuard] // NotPremiumGuard
  },
  {
    path: 'materials',
    component: MaterialsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-preview',
    component: CoursePreviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lesson-preview',
    component: LessonPreviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lesson',
    component: LessonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'highlights',
    component: HighlightsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/start',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
