import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTasksComponent } from './today-tasks.component';

describe('TodayTasksComponent', () => {
  let component: TodayTasksComponent;
  let fixture: ComponentFixture<TodayTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayTasksComponent]
    });
    fixture = TestBed.createComponent(TodayTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
