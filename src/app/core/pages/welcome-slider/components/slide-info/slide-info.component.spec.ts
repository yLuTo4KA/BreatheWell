import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideInfoComponent } from './slide-info.component';

describe('SlideInfoComponent', () => {
  let component: SlideInfoComponent;
  let fixture: ComponentFixture<SlideInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideInfoComponent]
    });
    fixture = TestBed.createComponent(SlideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
