import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsItemComponent } from './benefits-item.component';

describe('BenefitsItemComponent', () => {
  let component: BenefitsItemComponent;
  let fixture: ComponentFixture<BenefitsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenefitsItemComponent]
    });
    fixture = TestBed.createComponent(BenefitsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
