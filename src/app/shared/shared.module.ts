import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoLoaderComponent } from './components/logo-loader/logo-loader.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LogoLoaderComponent,
  ],
  exports: [    
    LogoLoaderComponent,
  ]
})
export class SharedModule { }
