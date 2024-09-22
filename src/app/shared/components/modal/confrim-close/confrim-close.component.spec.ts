import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimCloseComponent } from './confrim-close.component';

describe('ConfrimCloseComponent', () => {
  let component: ConfrimCloseComponent;
  let fixture: ComponentFixture<ConfrimCloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfrimCloseComponent]
    });
    fixture = TestBed.createComponent(ConfrimCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
