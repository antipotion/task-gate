import { TestBed } from '@angular/core/testing';

import { AuthUseCase } from './auth-use-case';

describe('AuthUseCase', () => {
  let service: AuthUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
