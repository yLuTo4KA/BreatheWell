import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioLessonComponent } from './audio-lesson.component';

describe('AudioLessonComponent', () => {
  let component: AudioLessonComponent;
  let fixture: ComponentFixture<AudioLessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioLessonComponent]
    });
    fixture = TestBed.createComponent(AudioLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
