import { TestBed } from '@angular/core/testing';

import { TeamFacade } from './team-facade';

describe('TeamFacade', () => {
  let service: TeamFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
