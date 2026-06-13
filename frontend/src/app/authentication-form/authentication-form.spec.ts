import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationForm } from './authentication-form';

describe('AuthenticationForm', () => {
  let component: AuthenticationForm;
  let fixture: ComponentFixture<AuthenticationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
