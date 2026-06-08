import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewResource } from './review-resource';

describe('ReviewResource', () => {
  let component: ReviewResource;
  let fixture: ComponentFixture<ReviewResource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewResource],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewResource);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
