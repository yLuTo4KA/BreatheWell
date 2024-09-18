import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePreviewComponent } from './course-preview.component';

describe('CoursePreviewComponent', () => {
  let component: CoursePreviewComponent;
  let fixture: ComponentFixture<CoursePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePreviewComponent]
    });
    fixture = TestBed.createComponent(CoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
