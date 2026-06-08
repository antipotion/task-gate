import { TestBed } from '@angular/core/testing';

import { ReviewFacade } from './review-facade';

describe('ReviewFacade', () => {
  let service: ReviewFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
