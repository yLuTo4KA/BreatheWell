import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

import { LogoLoaderComponent } from './components/logo-loader/logo-loader.component';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [ ButtonComponent, LogoLoaderComponent, TagComponent],
  exports: [    
    ButtonComponent,
    LogoLoaderComponent,
    TagComponent
  ]
})
export class SharedModule {}
