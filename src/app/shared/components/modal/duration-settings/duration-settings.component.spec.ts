import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationSettingsComponent } from './duration-settings.component';

describe('DurationSettingsComponent', () => {
  let component: DurationSettingsComponent;
  let fixture: ComponentFixture<DurationSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DurationSettingsComponent]
    });
    fixture = TestBed.createComponent(DurationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
