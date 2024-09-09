import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

import { LogoLoaderComponent } from './components/logo-loader/logo-loader.component';
import { TagComponent } from './components/tag/tag.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { MiniButtonComponent } from './components/mini-button/mini-button.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [ ButtonComponent, LogoLoaderComponent, TagComponent, SelectButtonComponent, MiniButtonComponent],
  exports: [    
    ButtonComponent,
    LogoLoaderComponent,
    TagComponent,
    MiniButtonComponent,
    SelectButtonComponent
  ]
})
export class SharedModule {}
