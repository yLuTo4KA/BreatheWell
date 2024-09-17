import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugesstComponent } from './suggest.component';

describe('SugesstComponent', () => {
  let component: SugesstComponent;
  let fixture: ComponentFixture<SugesstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SugesstComponent]
    });
    fixture = TestBed.createComponent(SugesstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
