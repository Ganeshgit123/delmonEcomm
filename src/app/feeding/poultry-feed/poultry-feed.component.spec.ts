import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoultryFeedComponent } from './poultry-feed.component';

describe('PoultryFeedComponent', () => {
  let component: PoultryFeedComponent;
  let fixture: ComponentFixture<PoultryFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoultryFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoultryFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
