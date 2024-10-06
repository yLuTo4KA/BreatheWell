import { Component, Input } from '@angular/core';

interface WeekDays {
  day: number;
  convertedDay: string;
  date: Date;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() userLastVisit!: Date;
  @Input() todayActive!: boolean;
  @Input() activeDays!: number;
  @Input() yearView!: boolean;

  week: WeekDays[] = [];
  currentDay: number = 0;
  currentActiveDays: number = 0;
  currentIndexedDay: number | null = null;

  dayOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  constructor() { }

  ngOnInit(): void {
    this.week = this.getWeek(this.userLastVisit);
    this.currentDay = new Date(this.userLastVisit).getDate();
    this.currentActiveDays = this.activeDays;
  }

  getWeek(date: Date): WeekDays[] {
    const currentDate = new Date(date);

    const dayOfWeek = currentDate.getDay();

    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() + diffToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const daysConverted: WeekDays[] = [];
    let tempDate = new Date(startOfWeek);

    while (tempDate <= endOfWeek) {
      const day = tempDate.getDate();
      let convertedDay = `${day < 10 ? '0' + day : day}`;

      daysConverted.push({
        day: day,
        convertedDay: convertedDay,
        date: new Date(tempDate)
      });

      tempDate.setDate(tempDate.getDate() + 1);
    }

    return daysConverted;
  }

  getYear(date: Date): number {
    return new Date(date).getFullYear();
  }

  getMonth(date: Date): string {
    const options = { month: 'short' } as Intl.DateTimeFormatOptions;
    let month = new Date(date).toLocaleDateString('ru-RU', options);
    return month.charAt(0).toUpperCase() + month.slice(1);
  }

  isActive(index: number, day: number): boolean {
    if(day === this.currentDay && this.todayActive) {
      return true;
    }
    if (day > this.currentDay - this.activeDays - (this.todayActive ? 0 : 1) && day < this.currentDay) {
      return true;
    }
    if(day > this.currentDay && day > this.week[this.week.length - 1].day) {
      const bigday = day + this.currentDay;
      if(day > bigday - this.activeDays - (this.todayActive ? 0 : 1) && day < bigday) {
        return true;
      }

    }
    return false
  }
}