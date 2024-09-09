import { Component } from '@angular/core';
@Component({
  selector: 'app-welcome-slider',
  templateUrl: './welcome-slider.component.html',
  styleUrls: ['./welcome-slider.component.scss'],

})
export class WelcomeSliderComponent {
  pages = [1, 2, 3, 4, 5, 6]
  currentPage = 1;
  changePage(page: any): void{
    this.currentPage = page;
  }
}
