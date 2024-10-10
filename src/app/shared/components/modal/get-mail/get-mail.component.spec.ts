import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMailComponent } from './get-mail.component';

describe('GetMailComponent', () => {
  let component: GetMailComponent;
  let fixture: ComponentFixture<GetMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetMailComponent]
    });
    fixture = TestBed.createComponent(GetMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
