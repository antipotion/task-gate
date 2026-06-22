import { TestBed } from '@angular/core/testing';

import { CommentUsecase } from './comment-usecase';

describe('CommentUsecase', () => {
  let service: CommentUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
