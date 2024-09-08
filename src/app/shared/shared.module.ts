import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

import { LogoLoaderComponent } from './components/logo-loader/logo-loader.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [ ButtonComponent, LogoLoaderComponent],
  exports: [    
    ButtonComponent,
    LogoLoaderComponent
  ]
})
export class SharedModule {}
