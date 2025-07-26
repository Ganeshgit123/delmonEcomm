import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipiesComponent } from './receipies.component';

describe('ReceipiesComponent', () => {
  let component: ReceipiesComponent;
  let fixture: ComponentFixture<ReceipiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
