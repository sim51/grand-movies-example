import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieViewCardComponent } from './view-card.component';

describe('MovieViewCardComponent', () => {
  let component: MovieViewCardComponent;
  let fixture: ComponentFixture<MovieViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieViewCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
