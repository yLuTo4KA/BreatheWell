import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundSettingsComponent } from './sound-settings.component';

describe('SoundSettingsComponent', () => {
  let component: SoundSettingsComponent;
  let fixture: ComponentFixture<SoundSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoundSettingsComponent]
    });
    fixture = TestBed.createComponent(SoundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
