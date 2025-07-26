import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoulFeedComponent } from './poul-feed.component';

describe('PoulFeedComponent', () => {
  let component: PoulFeedComponent;
  let fixture: ComponentFixture<PoulFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoulFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoulFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
