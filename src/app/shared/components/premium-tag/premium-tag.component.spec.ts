import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumTagComponent } from './premium-tag.component';

describe('PremiumTagComponent', () => {
  let component: PremiumTagComponent;
  let fixture: ComponentFixture<PremiumTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumTagComponent]
    });
    fixture = TestBed.createComponent(PremiumTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
