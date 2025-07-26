import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionFComponent } from './description-f.component';

describe('DescriptionFComponent', () => {
  let component: DescriptionFComponent;
  let fixture: ComponentFixture<DescriptionFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
