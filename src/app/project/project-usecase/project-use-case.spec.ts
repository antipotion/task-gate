import { TestBed } from '@angular/core/testing';

import { ProjectUseCase } from './project-use-case';

describe('ProjectUseCase', () => {
  let service: ProjectUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
