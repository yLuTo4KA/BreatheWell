import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPremiumComponent } from './buy-premium.component';

describe('BuyPremiumComponent', () => {
  let component: BuyPremiumComponent;
  let fixture: ComponentFixture<BuyPremiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyPremiumComponent]
    });
    fixture = TestBed.createComponent(BuyPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
