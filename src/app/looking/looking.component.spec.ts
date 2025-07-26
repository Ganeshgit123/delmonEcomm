import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookingComponent } from './looking.component';

describe('LookingComponent', () => {
  let component: LookingComponent;
  let fixture: ComponentFixture<LookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
