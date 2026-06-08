import { TestBed } from '@angular/core/testing';

import { ReviewStore } from './review-store';

describe('ReviewStore', () => {
  let service: ReviewStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
