import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dayli-progress',
  templateUrl: './dayli-progress.component.html',
  styleUrls: ['./dayli-progress.component.scss']
})
export class DayliProgressComponent implements OnInit{
  private authService = inject(AuthService);
  userData!: User;
  currentDay: number = 0;

  private numberName = ['первое', 'второе', 'третье', 'четвертое', 'пятое', 'шестое', 'седьмое', 'восьмое', 'девятое'];

  constructor(){}

  ngOnInit(): void {
    this.authService.user$.subscribe(response => {
      if(response) {
        this.userData = response;
        this.currentDay = response.activeDays;
      }
    })
  }

  getCurrentDayName(): string {
    if(this.currentDay >= 10) {
      return `${this.currentDay}-ое`;
    }else {
      return this.numberName[this.currentDay - 1];
    }
  }
}
