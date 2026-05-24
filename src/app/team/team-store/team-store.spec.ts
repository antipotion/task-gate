import { TestBed } from '@angular/core/testing';

import { TeamStore } from './team-store';

describe('TeamStore', () => {
  let service: TeamStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
