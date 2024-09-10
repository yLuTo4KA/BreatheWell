import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

import { LogoLoaderComponent } from './components/logo-loader/logo-loader.component';
import { TagComponent } from './components/tag/tag.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { MiniButtonComponent } from './components/mini-button/mini-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { PracticeSettingsComponent } from './components/practice-settings/practice-settings.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [ ButtonComponent, LogoLoaderComponent, TagComponent, SelectButtonComponent, MiniButtonComponent, ModalComponent, PracticeSettingsComponent],
  exports: [    
    ButtonComponent,
    LogoLoaderComponent,
    TagComponent,
    MiniButtonComponent,
    SelectButtonComponent,
    ModalComponent,
    PracticeSettingsComponent
  ]
})
export class SharedModule {}
