import { TestBed } from '@angular/core/testing';

import { TeamUsecase } from './team-usecase';

describe('TeamUsecase', () => {
  let service: TeamUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
