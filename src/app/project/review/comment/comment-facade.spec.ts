import { TestBed } from '@angular/core/testing';

import { CommentFacade } from './comment-facade';

describe('CommentFacade', () => {
  let service: CommentFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
