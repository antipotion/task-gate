import { TestBed } from '@angular/core/testing';

import { FirebaseAuth } from './firebase-auth';

describe('FirebaseAuth', () => {
  let service: FirebaseAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
