import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathingComponent } from './breathing.component';

describe('BreathingComponent', () => {
  let component: BreathingComponent;
  let fixture: ComponentFixture<BreathingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreathingComponent]
    });
    fixture = TestBed.createComponent(BreathingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
