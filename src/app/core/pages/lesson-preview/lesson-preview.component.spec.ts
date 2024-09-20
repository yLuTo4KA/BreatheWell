import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPreviewComponent } from './lesson-preview.component';

describe('LessonPreviewComponent', () => {
  let component: LessonPreviewComponent;
  let fixture: ComponentFixture<LessonPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonPreviewComponent]
    });
    fixture = TestBed.createComponent(LessonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
