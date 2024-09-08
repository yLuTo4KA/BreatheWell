import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthComponent } from './core/components/not-auth/not-auth.component';
import { WelcomeComponent } from './core/pages/start-page/children/welcome/welcome.component';
import { WelcomeSliderComponent } from './core/pages/start-page/children/welcome-slider/welcome-slider.component';
import { CtaComponent } from './core/pages/start-page/children/cta/cta.component';
import { StartPageComponent } from './core/pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
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
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [AuthGuard],
        data: {animation: 'WelcomePage'}
      },
      {
        path: 'welcome-slider',
        component: WelcomeSliderComponent,
        canActivate: [AuthGuard],
        data: {animation: 'WelcomeSliderPage'}
      },
      {
        path: 'cta',
        component: CtaComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
