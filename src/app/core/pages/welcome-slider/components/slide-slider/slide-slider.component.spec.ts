import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideSliderComponent } from './slide-slider.component';

describe('SlideSliderComponent', () => {
  let component: SlideSliderComponent;
  let fixture: ComponentFixture<SlideSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideSliderComponent]
    });
    fixture = TestBed.createComponent(SlideSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
