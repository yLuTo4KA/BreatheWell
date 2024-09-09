import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniButtonComponent } from './mini-button.component';

describe('MiniButtonComponent', () => {
  let component: MiniButtonComponent;
  let fixture: ComponentFixture<MiniButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniButtonComponent]
    });
    fixture = TestBed.createComponent(MiniButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
