import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCompleteFComponent } from './booking-complete-f.component';

describe('BookingCompleteFComponent', () => {
  let component: BookingCompleteFComponent;
  let fixture: ComponentFixture<BookingCompleteFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingCompleteFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCompleteFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
