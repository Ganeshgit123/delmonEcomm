import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBarFComponent } from './login-bar-f.component';

describe('LoginBarFComponent', () => {
  let component: LoginBarFComponent;
  let fixture: ComponentFixture<LoginBarFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginBarFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBarFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
