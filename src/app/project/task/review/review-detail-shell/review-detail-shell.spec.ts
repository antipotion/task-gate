import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDetailShell } from './review-detail-shell';

describe('ReviewDetailShell', () => {
  let component: ReviewDetailShell;
  let fixture: ComponentFixture<ReviewDetailShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDetailShell],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewDetailShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
