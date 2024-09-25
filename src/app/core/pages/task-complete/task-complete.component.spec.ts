import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompleteComponent } from './task-complete.component';

describe('TaskCompleteComponent', () => {
  let component: TaskCompleteComponent;
  let fixture: ComponentFixture<TaskCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCompleteComponent]
    });
    fixture = TestBed.createComponent(TaskCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
