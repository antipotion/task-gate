import { TestBed } from '@angular/core/testing';

import { ReviewUsecase } from './review-usecase';

describe('ReviewUsecase', () => {
  let service: ReviewUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
