import { TestBed } from '@angular/core/testing';

import { SignupSessionStorage } from './signup-session-storage';

describe('SignupSessionStorage', () => {
  let service: SignupSessionStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupSessionStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
