import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFComponent } from './search-f.component';

describe('SearchFComponent', () => {
  let component: SearchFComponent;
  let fixture: ComponentFixture<SearchFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
