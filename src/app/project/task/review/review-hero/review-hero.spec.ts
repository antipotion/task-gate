import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHero } from './review-hero';

describe('ReviewHero', () => {
  let component: ReviewHero;
  let fixture: ComponentFixture<ReviewHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewHero],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
