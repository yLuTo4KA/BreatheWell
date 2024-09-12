import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayliProgressComponent } from './dayli-progress.component';

describe('DayliProgressComponent', () => {
  let component: DayliProgressComponent;
  let fixture: ComponentFixture<DayliProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayliProgressComponent]
    });
    fixture = TestBed.createComponent(DayliProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
